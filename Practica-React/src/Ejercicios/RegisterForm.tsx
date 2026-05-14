import React, { useState } from "react";

interface FormState {
  nombre: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterForm = () => {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [userRegistered, setUserRegistered] = useState<{nombre: string, email: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value, 
    });
  };

  const isEmailValid = form.email.includes("@");
  const isPasswordValid = form.password.length >= 8;
  const passwordsMatch = form.password === form.confirmPassword;
  const isFormValid = form.nombre.trim() !== "" && isEmailValid && isPasswordValid && passwordsMatch;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isFormValid) {
      setUserRegistered({ nombre: form.nombre, email: form.email });
    }
  };

  return (
    <div>
      <h2>Formulario de Registro</h2>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input 
            type="text" 
            name="nombre" 
            value={form.nombre} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div>
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={form.email} 
            onChange={handleChange} 
            required 
          />
          {!isEmailValid && form.email.length > 0 && (
            <span>El email debe contener @</span>
          )}
        </div>

        <div>
          <label>Contraseña:</label>
          <input 
            type="password" 
            name="password" 
            value={form.password} 
            onChange={handleChange} 
            required 
          />
          {!isPasswordValid && form.password.length > 0 && (
            <span>Mínimo 8 caracteres</span>
          )}
        </div>

        <div>
          <label>Confirmar Contraseña:</label>
          <input 
            type="password" 
            name="confirmPassword" 
            value={form.confirmPassword} 
            onChange={handleChange} 
            required 
          />
          {!passwordsMatch && form.confirmPassword.length > 0 && (
            <span>Las contraseñas no coinciden</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>
          Registrar
        </button>
      </form>

      {userRegistered && (
        <div>
          <h3>Usuario Registrado</h3>
          <p><strong>Nombre:</strong> {userRegistered.nombre}</p>
          <p><strong>Email:</strong> {userRegistered.email}</p>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
