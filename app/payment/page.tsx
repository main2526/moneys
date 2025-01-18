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
                    purchase_units: [
                      {
                        amount: {
                          currency_code: "USD", // Código de la moneda
                          value: "25.99", // Monto a cobrar
                        },
                      },
                    ],
                  });
                }}
                onApprove={(data, actions) => {
                  return actions.order.capture().then((details) => {
                    alert(
                      "Transaction completed by " +
                        details.payer.name.given_name
                    );

                    // Maneja la lógica de éxito aquí
                  });
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
