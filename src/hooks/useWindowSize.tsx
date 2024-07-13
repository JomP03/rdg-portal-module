import { useState, useEffect } from 'react';


export function useWindowSize() {
  // Inicializar o estado com o tamanho atual da janela
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  // Manipulador para chamar no redimensionamento da janela
  function handleResize() {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  // Adicionar event listener no montar
  // Remover event listener no desmontar
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // Vazio, então executa apenas no montar e desmontar

  return windowSize;
}
