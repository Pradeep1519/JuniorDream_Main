import { useState } from "react";
import { useSearchParams } from "react-router";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { Button } from "@/components/common/Button";
import { db } from "@/lib/firebase";

const inputClass =
  "w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 bg-input-background";
const labelClass = "text-sm font-medium mb-2 block";

type Status = "idle" | "submitting" | "success" | "error";

export function ApplicationForm() {
  const [searchParams] = useSearchParams();
  const stream = searchParams.get("stream") || "engineering";
  const prefilledBatch = searchParams.get("batch") || "";
  const prefilledClassRange = searchParams.get("class") || "";
  const prefilledTier = searchParams.get("tier") || "";

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
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
      await addDoc(collection(db, "applications"), {
        studentName: formData.studentName,
        dob: formData.dob || null,
        gender: formData.gender || null,
        fatherName: formData.fatherName || null,
        motherName: formData.motherName || null,
        stream,
        classApplying: formData.classApplying,
        batchLevel: prefilledBatch || null,
        tier: prefilledTier || null,
        previousSchool: formData.previousSchool || null,
        mobile: formData.mobile,
        alternateMobile: formData.alternateMobile || null,
        email: formData.email || null,
        address: formData.address || null,
        howHeard: formData.howHeard || null,
        referralCode: formData.referralCode || null,
        agreedTerms: formData.agreedTerms,
        status: "new",
        createdAt: serverTimestamp(),
      });
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Please try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-medium mb-3">Application Received! 🎉</h3>
        <p className="text-foreground/60">
          Thank you, {formData.studentName}. Our team will reach out to you on{" "}
          {formData.mobile} shortly.
        </p>
      </div>
    );
  }

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
          <input
            type="tel"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            placeholder="10 digits"
            pattern="[0-9]{10}"
            className={inputClass}
            required
          />
        </div>
        <div>
          <label className={labelClass}>Alternate Number</label>
          <input type="tel" name="alternateMobile" value={formData.alternateMobile} onChange={handleChange} className={inputClass} />
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
        <p className="text-sm text-red-600">
          Something went wrong: {errorMsg}. Please try again or contact us directly.
        </p>
      )}

      <Button type="submit" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? "Submitting..." : "Submit Application"}
      </Button>
    </form>
  );
}
