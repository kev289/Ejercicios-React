import { useForm } from "../hooks/useForm";

interface ContactData {
  nombre: string;
  asunto: string;
  mensaje: string;
}

const ContactForm = () => {
  const { values, handleChange, resetForm } = useForm<ContactData>({
    nombre: "",
    asunto: "",
    mensaje: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos enviados:", values);
    alert(`Gracias ${values.nombre}, hemos recibido tu mensaje.`);
    resetForm();
  };

  return (
    <div>
      <h2>Hook Personalizado</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={values.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Asunto:</label>
          <input 
            type="text" 
            name="asunto" 
            value={values.asunto} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Mensaje:</label>
          <textarea 
            name="mensaje" 
            rows={4}
            value={values.mensaje} 
            onChange={handleChange} 
           
            required 
          />
        </div>

        <button type="submit">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
