import { updateProfessionalApplicationPayment } from "@/lib/professionalApplications";

// Payment gateway abstraction. No provider is wired up yet — this layer exists so a real
// gateway (e.g. Razorpay/Stripe, created and verified from a secure backend) can be dropped in
// later without reshaping the application form or Firestore schema.
//
// IMPORTANT: never mark a payment "successful" from the client. Order creation must happen on a
// trusted backend (so the amount/course can't be tampered with), and success must come only from
// a verified server-side/webhook confirmation. These functions currently only record intent.

export interface PaymentPlan {
  label: string;
  amount: number;
  months: number;
}

export interface PaymentOrder {
  orderId: string;
  applicationId: string;
  amount: number;
  status: "initiated";
}

export async function createPaymentOrder(applicationId: string, plan: PaymentPlan): Promise<PaymentOrder> {
  // TODO: replace with a real backend call (e.g. a Cloud Function) that creates the order
  // server-side using the course's trusted fee data, not this client-provided `plan`.
  const orderId = `PENDING-${applicationId}`;
  await updateProfessionalApplicationPayment(applicationId, {
    paymentStatus: "initiated",
    paymentOrderId: orderId,
  });
  return { orderId, applicationId, amount: plan.amount, status: "initiated" };
}

export async function verifyPayment(): Promise<never> {
  throw new Error("Payment gateway is not integrated yet. Verification must happen on a secure backend once the gateway is connected.");
}

export async function handlePaymentSuccess(): Promise<never> {
  throw new Error("Payment success can only be recorded after a verified backend/webhook confirmation.");
}

export async function handlePaymentFailure(applicationId: string) {
  await updateProfessionalApplicationPayment(applicationId, { paymentStatus: "failed" });
}
