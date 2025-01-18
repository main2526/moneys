"use client";
import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";
import { Onest } from "next/font/google";
import "./module.css";

const Fonts = Onest({ subsets: ["latin"], weight: "400" });

export default function Payment() {
  return (
    <>
      <SignedIn>
        <PayPalScriptProvider
          options={{
            clientId:
              "AecLz0_OTn23pVPyAX8mTO85aMT8GddGMn-Ga0IFVoFG_p6rrGG6TJ35MNIl4kWPFk0tRNdpG7Qvd7Ef",
          }}
        >
          <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-10 shadow-2xl rounded-lg">
              <h2
                className={`${Fonts.className} text-2xl bold text-center font-semibold mb-4 shadow-sm`}
              >
                Realiza tu pago
              </h2>
              <PayPalButtons
                style={{ layout: "vertical", color: "gold" }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    intent: "CAPTURE", // Agregado intent
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD",
                          value: "25.99", // Monto a cobrar
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  // Verificación de si actions.order está definido
                  if (actions.order) {
                    return actions.order.capture().then((details) => {
                      const payerName = details.payer?.name?.given_name || "Desconocido";
                      alert("Transaction completed by " + payerName);
                      // Lógica de éxito aquí
                    });
                  } else {
                    console.error("Order not defined");
                    // Retorna un Promise rechazado si `actions.order` no está definido
                    return Promise.reject("Order not found");
                  }
                }}
              />
            </div>
          </div>
        </PayPalScriptProvider>
      </SignedIn>

      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
