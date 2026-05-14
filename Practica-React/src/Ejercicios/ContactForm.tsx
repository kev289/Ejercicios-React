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
    <div className="exercise-container">
      <h2>13. Hook Personalizado (useForm)</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={values.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Asunto:</label>
          <input 
            type="text" 
            name="asunto" 
            value={values.asunto} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="form-group">
          <label>Mensaje:</label>
          <textarea 
            name="mensaje" 
            rows={4}
            value={values.mensaje} 
            onChange={handleChange} 
            style={{ width: '100%', borderRadius: '12px', padding: '10px', background: 'var(--bg)', color: 'var(--text-h)', border: '1px solid var(--border)' }}
            required 
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
