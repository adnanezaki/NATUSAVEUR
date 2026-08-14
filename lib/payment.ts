import type { Order, PaymentProvider } from "@/data/types";

// Modular payment abstraction — additional providers (Moroccan online
// payment gateway, card processor, etc.) can implement this interface once
// credentials are configured. Only cash-on-delivery is active for now.
export const cashOnDeliveryProvider: PaymentProvider = {
  id: "cod",
  name: "Paiement à la livraison",
  async createPayment(order: Order) {
    return { success: true, reference: `COD-${order.id}` };
  },
};

export const paymentProviders: PaymentProvider[] = [cashOnDeliveryProvider];
