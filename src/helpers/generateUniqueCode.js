const generateUniqueCode = () => {
    const min = 100000; // El número más pequeño de 6 dígitos
    const max = 999999; // El número más grande de 6 dígitos
    const uniqueCode = Math.floor(Math.random() * (max - min + 1)) + min;
    return uniqueCode;
  }

  export default generateUniqueCode