import { useState, useEffect } from 'react';

const ProgressBar = ({ color = 'bg-green-600' }) => {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [footerHeight, setFooterHeight] = useState(0);

  // Funzione per calcolare l'altezza del footer
  const calculateFooterHeight = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      setFooterHeight(footerElement.offsetHeight); // Calcola l'altezza del footer
    }
  };

  // Funzione per calcolare la percentuale di scorrimento
  const calculateScroll = () => {
    const scrollTop = window.scrollY; // Posizione di scroll verticale
    const docHeight = document.documentElement.scrollHeight - footerHeight; // Altezza totale del documento (meno l'altezza del footer)
    const winHeight = window.innerHeight; // Altezza della finestra visibile

    const scrollPosition = (scrollTop / (docHeight - winHeight)) * 100; // Percentuale di scorrimento
    setScrollPercent(scrollPosition);
  };

  // Esegui il calcolo dell'altezza del footer e la gestione dello scroll
  useEffect(() => {
    // Calcola l'altezza del footer e inizializza lo scroll
    calculateFooterHeight();
    window.addEventListener('scroll', calculateScroll);

    // Aggiungi un listener per il ridimensionamento della finestra
    window.addEventListener('resize', calculateFooterHeight);

    // Rimuovi gli event listener quando il componente viene smontato
    return () => {
      window.removeEventListener('scroll', calculateScroll);
      window.removeEventListener('resize', calculateFooterHeight);
    };
  }, [footerHeight]); // La dipendenza da `footerHeight` assicura che si ricalcoli quando il footer cambia

  return (
    <div className="w-full bg-transparent fixed top-0 rounded-full">
      <div
        className={`h-1.5 rounded-full ${color} `}
        style={{ width: `${scrollPercent}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;
