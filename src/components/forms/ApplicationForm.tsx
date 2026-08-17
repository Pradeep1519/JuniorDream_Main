import { useState } from "react";
import { useSearchParams } from "react-router";
import { 
  collection, 
  serverTimestamp, 
  doc, 
  getDoc, 
  setDoc, 
  query,
  where,
  getDocs
} from "firebase/firestore";
import { Button } from "@/components/common/Button";
import { db } from "@/lib/firebase";

const inputClass =
  "w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 bg-input-background";
const labelClass = "text-sm font-medium mb-2 block";

type Status = "idle" | "submitting" | "success" | "error";

// Fast Custom Application ID Generator
async function generateApplicationId(prefix: string): Promise<string> {
  const counterRef = doc(db, "counters", `${prefix}_counter`);
  
  try {
    const counterDoc = await getDoc(counterRef);
    let nextNumber = 1;
    
    if (counterDoc.exists()) {
      const currentCount = counterDoc.data().count || 0;
      nextNumber = currentCount + 1;
      await setDoc(counterRef, { count: nextNumber }, { merge: true });
    } else {
      await setDoc(counterRef, { 
        name: `${prefix}_counter`,
        count: 1,
        createdAt: serverTimestamp()
      });
      nextNumber = 1;
    }
    
    const formattedNumber = String(nextNumber).padStart(4, "0");
    return `${prefix}${formattedNumber}`;
  } catch (error) {
    console.error("Error generating application ID:", error);
    const timestamp = Date.now().toString().slice(-6);
    return `${prefix}${timestamp}`;
  }
}

// Duplicate Check Function
async function checkDuplicateApplication(collectionName: string, mobile: string): Promise<boolean> {
  try {
    const applicationsRef = collection(db, collectionName);
    
    const mobileQuery = query(applicationsRef, where("mobile", "==", mobile));
    const mobileSnapshot = await getDocs(mobileQuery);
    
    if (!mobileSnapshot.empty) {
      return true;
    }
    
    return false;
  } catch (error) {
    console.error("Error checking duplicate:", error);
    return false;
  }
}

export function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const stream = searchParams.get("stream") || "engineering";
  const prefilledBatch = searchParams.get("batch") || "";
  const prefilledClassRange = searchParams.get("class") || "";
  const prefilledTier = searchParams.get("tier") || "";
  
  // Check if this is interest registration (coming soon programs)
  const isInterestRegistration = stream === "medical" || stream === "civil-services";
  
  // Collection name based on stream
  const collectionName = stream === "medical" 
    ? "medical_interests" 
    : stream === "civil-services" 
      ? "civil_services_interests" 
      : "applications";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [applicationId, setApplicationId] = useState("");

  const [formData, setFormData] = useState({
    studentName: "",
    dob: "",
    gender: "",
    fatherName: "",
    motherName: "",
    classApplying: "",
    previousSchool: "",
    mobile: "",
    alternateMobile: "",
    email: "",
    address: "",
    howHeard: "",
    referralCode: "",
    agreedTerms: false,
    location: "", // For interest registration
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (name === "mobile" || name === "alternateMobile") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 10);
      setFormData({ ...formData, [name]: digitsOnly });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      // Mobile number validate karo
      if (formData.mobile.length !== 10) {
        setStatus("error");
        setErrorMsg("Please enter a valid 10-digit mobile number.");
        return;
      }

      // Check duplicate
      const isDuplicate = await checkDuplicateApplication(
        collectionName,
        `+91${formData.mobile.trim()}`
      );

      if (isDuplicate) {
        setStatus("error");
        setErrorMsg("An application with this mobile number already exists. Please contact us directly.");
        return;
      }

      // Generate ID based on stream
      let prefix = "JR"; // Default for engineering
      if (stream === "medical") prefix = "MD";
      if (stream === "civil-services") prefix = "CS";
      
      const customId = await generateApplicationId(prefix);
      setApplicationId(customId);

      // Prepare data based on form type
      let applicationData;
      
      if (isInterestRegistration) {
        // Simple interest registration data
        applicationData = {
          interestId: customId,
          studentName: formData.studentName.trim(),
          classApplying: formData.classApplying,
          mobile: `+91${formData.mobile.trim()}`,
          location: formData.location.trim(),
          stream: stream,
          status: "interest_registered",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
      } else {
        // Full engineering application data
        applicationData = {
          applicationId: customId,
          studentName: formData.studentName.trim(),
          dob: formData.dob || null,
          gender: formData.gender || null,
          fatherName: formData.fatherName.trim() || null,
          motherName: formData.motherName.trim() || null,
          stream,
          classApplying: formData.classApplying,
          batchLevel: prefilledBatch || null,
          tier: prefilledTier || null,
          previousSchool: formData.previousSchool.trim() || null,
          mobile: `+91${formData.mobile.trim()}`,
          alternateMobile: formData.alternateMobile ? `+91${formData.alternateMobile.trim()}` : null,
          email: formData.email.trim() || null,
          address: formData.address.trim(),
          howHeard: formData.howHeard || null,
          referralCode: formData.referralCode.trim() || null,
          agreedTerms: formData.agreedTerms,
          status: "new",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };
      }

      // Save to Firestore
      const docRef = doc(db, collectionName, customId);
      await setDoc(docRef, applicationData);

      console.log(`${isInterestRegistration ? "Interest" : "Application"} saved with ID:`, customId);
      setStatus("success");
    } catch (err) {
      console.error("Error saving:", err);
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <span className="text-6xl block mb-4">{isInterestRegistration ? "📝" : "🎉"}</span>
          <h3 className="text-2xl font-medium mb-3">
            {isInterestRegistration ? "Interest Registered!" : "Application Received!"}
          </h3>
        </div>
        
        {applicationId && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 inline-block">
            <p className="text-sm text-gray-500 mb-1">
              {isInterestRegistration ? "Your Registration ID" : "Your Application ID"}
            </p>
            <p className="text-xl font-bold text-black tracking-wider">{applicationId}</p>
          </div>
        )}
        
        <p className="text-foreground/60">
          Thank you, <strong>{formData.studentName}</strong>. 
          {isInterestRegistration 
            ? `We'll notify you when ${stream === "medical" ? "Medical" : "Civil Services"} program launches.`
            : `Our team will reach out to you on +91 ${formData.mobile} shortly.`}
        </p>
        <p className="text-foreground/40 text-sm mt-4">
          Please save your {isInterestRegistration ? "Registration ID" : "Application ID"} for future reference.
        </p>
        <button
          onClick={() => {
            setStatus("idle");
            setApplicationId("");
            setFormData({
              studentName: "",
              dob: "",
              gender: "",
              fatherName: "",
              motherName: "",
              classApplying: "",
              previousSchool: "",
              mobile: "",
              alternateMobile: "",
              email: "",
              address: "",
              howHeard: "",
              referralCode: "",
              agreedTerms: false,
              location: "",
            });
          }}
          className="mt-8 text-sm text-black underline underline-offset-4 hover:opacity-70 transition-opacity"
          style={{ fontFamily: "'Inter', Helvetica, Arial, sans-serif" }}
        >
          {isInterestRegistration ? "Register Another Interest" : "Submit Another Application"}
        </button>
      </div>
    );
  }

  // Interest Registration Form (Simple)
  if (isInterestRegistration) {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-md px-4 py-3 text-sm">
          Registering interest for: <strong>{stream === "medical" ? "Medical Foundations" : "Civil Services Leadership"}</strong>
        </div>

        <div>
          <label className={labelClass}>Student's Full Name *</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="Enter student's name"
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className={labelClass}>Class *</label>
          <select
            name="classApplying"
            value={formData.classApplying}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select Class</option>
            {[6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                Class {g}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={labelClass}>Mobile Number *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              +91
            </span>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digits"
              className={`${inputClass} pl-12`}
              maxLength={10}
              required
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Location *</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="City, State"
            className={inputClass}
            required
          />
        </div>

        {status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">
              {errorMsg}
            </p>
          </div>
        )}

        <Button type="submit" className="w-full" disabled={status === "submitting"}>
          {status === "submitting" ? "Registering..." : "Register Interest"}
        </Button>
      </form>
    );
  }

  // Full Engineering Application Form
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {(prefilledBatch || prefilledClassRange) && (
        <div className="bg-secondary rounded-md px-4 py-3 text-sm">
          Applying for: <strong>{prefilledBatch || "Engineering"}</strong>
          {prefilledClassRange && ` (Class ${prefilledClassRange})`}
          {prefilledTier && ` — ${prefilledTier} Plan`}
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Student's Full Name *</label>
          <input
            type="text"
            name="studentName"
            value={formData.studentName}
            onChange={handleChange}
            placeholder="As per documents"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Date of Birth *</label>
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className={inputClass}
            required
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Gender *</label>
          <select name="gender" value={formData.gender} onChange={handleChange} className={inputClass} required>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Class Applying For *</label>
          <select
            name="classApplying"
            value={formData.classApplying}
            onChange={handleChange}
            className={inputClass}
            required
          >
            <option value="">Select</option>
            {[6, 7, 8, 9, 10, 11, 12].map((g) => (
              <option key={g} value={g}>
                Class {g}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Father's Name *</label>
          <input type="text" name="fatherName" value={formData.fatherName} onChange={handleChange} className={inputClass} required />
        </div>
        <div>
          <label className={labelClass}>Mother's Name *</label>
          <input type="text" name="motherName" value={formData.motherName} onChange={handleChange} className={inputClass} required />
        </div>
      </div>

      <div>
        <label className={labelClass}>Previous School</label>
        <input type="text" name="previousSchool" value={formData.previousSchool} onChange={handleChange} className={inputClass} />
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>Mobile Number *</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              +91
            </span>
            <input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              placeholder="10 digits"
              className={`${inputClass} pl-12`}
              maxLength={10}
              required
            />
          </div>
        </div>
        <div>
          <label className={labelClass}>Alternate Number</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm font-medium">
              +91
            </span>
            <input 
              type="tel" 
              name="alternateMobile" 
              value={formData.alternateMobile} 
              onChange={handleChange} 
              placeholder="10 digits"
              className={`${inputClass} pl-12`}
              maxLength={10}
            />
          </div>
        </div>
      </div>

      <div>
        <label className={labelClass}>Email Address</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClass} />
      </div>

      <div>
        <label className={labelClass}>Full Residential Address *</label>
        <textarea
          name="address"
          rows={3}
          value={formData.address}
          onChange={handleChange}
          className={`${inputClass} resize-none`}
          required
        />
      </div>

      <div>
        <label className={labelClass}>How did you hear about us?</label>
        <select name="howHeard" value={formData.howHeard} onChange={handleChange} className={inputClass}>
          <option value="">Select</option>
          <option value="social_media">Social Media</option>
          <option value="friend_family">Friend/Family</option>
          <option value="newspaper">Newspaper</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label className={labelClass}>Referral Code (if any)</label>
        <input
          type="text"
          name="referralCode"
          value={formData.referralCode}
          onChange={handleChange}
          placeholder="Enter code for discount"
          className={inputClass}
        />
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          name="agreedTerms"
          checked={formData.agreedTerms}
          onChange={handleChange}
          className="mt-1"
          required
        />
        <label className="text-sm text-foreground/70">
          I declare all information is correct and agree to the institution's terms and conditions.
        </label>
      </div>

      {status === "error" && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <p className="text-sm text-red-600">
            {errorMsg}
          </p>
        </div>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}