import React, { useState, useRef, useEffect } from "react";
import Links from "next/link";
import { Onest } from "next/font/google";
import { DatePayment } from "./data";

export const MyOnestFont = Onest({ subsets: ["latin"], weight: ["400", "800"] });

export default function EarnMoney() {
  const [showLink, setShowLink] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [autoplayStarted, setAutoplayStarted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  // Función para deshabilitar adelanto y retraso
  const handleSeeking = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  // Event listener para el evento 'seeking'
  if (videoRef.current) {
    videoRef.current.addEventListener("seeking", handleSeeking);
  }
  useEffect(() => {
    return () => {
      // Limpieza del event listener al desmontar el componente
      if (videoRef.current) {
        videoRef.current.removeEventListener("seeking", handleSeeking);
      }
    };
  }, []);

  useEffect(() => {
    // Autoplay el video cuando showLink se hace true
    if (showLink && videoRef.current && !autoplayStarted) {
      videoRef.current.play();
      setAutoplayStarted(true);
      setIsPlaying(true); // Marcar el video como reproduciéndose
    }
  }, [showLink, autoplayStarted]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      // Convertir el tiempo actual del video a minutos
      const currentTime = videoRef.current.currentTime;
      // Si el video ha llegado al minuto 5, mostrar el enlace
      if (currentTime >= 5 * 60 ) {
        setShowLink(true);
      }
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className={`${MyOnestFont.className} p-6 text-white`}>
      <h2 className="text-center mb-4 text-xl font-semibold">
        • Video de 7 minutos •
      </h2>
      <p className="text-center mb-4">
        Descubre una{" "}
        <strong className="bg-gray-800 px-2 py-1 rounded">
          nueva profesión
        </strong>{" "}
        con la que asegurar tu futuro económico, tener siempre trabajo, un{" "}
        <strong>muy buen salario</strong> y no tener un techo en tu carrera
        profesional.
      </p>

      <p className="text-center mb-4">
        {showMore ? (
          <>
            <span
              className="text-blue-500 cursor-pointer ml-2 transition-all duration-1000"
              onClick={() => setShowMore(false)}
            >
              Leer mas
            </span>
          </>
        ) : (
          <>
            ¡Descubre cómo puedes ganar dinero fácilmente y asegurar tu futuro
            hoy mismo! 🚀 ¿Buscas una oportunidad para incrementar tus ingresos
            sin complicaciones? Te presentamos una propuesta simple y efectiva
            que te permitirá ganar dinero de manera fácil y rápida. Con nuestro
            innovador método, podrás empezar a generar ingresos adicionales
            desde la comodidad de tu hogar. 💰 Lo que ofrecemos: Método probado:
            Un sistema sencillo y accesible que te guiará paso a paso. Ingresos
            adicionales: Oportunidades de ganar dinero sin necesidad de
            experiencia previa. Flexibilidad total: Trabaja a tu propio ritmo y
            desde cualquier lugar. 🔑 No dejes pasar esta oportunidad única para
            mejorar tus finanzas y alcanzar tus metas económicas.{" "}
            <span
              className="text-blue-500 cursor-pointer transition-all duration-1000"
              onClick={() => setShowMore(true)}
            >
              Leer menos{" "}
            </span>
          </>
        )}
      </p>

      <div className="flex justify-center mt-10">
        <video
          id="video"
          src="./videoplayback.mp4"
          className="w-full max-w-lg rounded shadow-xl border-white border-10"
          ref={videoRef}
          onTimeUpdate={handleTimeUpdate}
          onClick={handlePlayPause}
          autoPlay // Autoplay activado
          controls={false} // Deshabilitar todos los controles predeterminados del video
        >
          Tu navegador no soporta la etiqueta de video.
        </video>
        {/* Control de pausa personalizado */}
        {isPlaying && (
          <button
            className="absolute top-1/2 left-1/2 transform cursor-pointer -translate-x-1/2 -translate-y-1/2 text-white rounded-full p-2 focus:outline-none"
            onClick={handlePlayPause}
          ></button>
        )}
      </div>

      {showLink && (
        <div className="text-center animate-bounce mt-10 hover:scale-105">
          <Links
            href={DatePayment.linkUrlX}
            className="text-white hover:underline bg-gray-800 p-2 rounded-sm animate-bounce"
          >
            Haz clic aquí para recibir el dinero
          </Links>
          <div className="mt-4"></div>
        </div>
      )}
    </div>
  );
}
