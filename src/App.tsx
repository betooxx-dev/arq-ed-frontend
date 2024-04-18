import axios from "axios";
import { useEffect } from "react";
import { io } from "socket.io-client";

function App() {
  const socket = io("https://ed-ws.onrender.com");

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Conectado al servidor de sockets");
    });

    socket.on("payment", (payment) => {
      const paymentAmount = parseInt(payment.total);
      alert("Pago recibido:" + paymentAmount);
    });
  }, []);

  const handleOnClick = async () => {
    try {
      await axios.post("https://ed-order.onrender.com/order", {
        amount: 100,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center text-2xl justify-center bg-black text-white font-bold h-screen">
      <div className="p-10">Hola, Mundo!</div>
      <div className="p-10">
        <button
          className="p-10 bg-slate-500 rounded-md"
          onClick={handleOnClick}
        >
          Haz una compra
        </button>
      </div>
    </div>
  );
}

export default App;
