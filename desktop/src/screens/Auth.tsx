import { useState, type FormEvent } from "react";
import type { ApiClient, Sesion } from "@flowsort/shared";

export function Auth({ api, onAuth }: { api: ApiClient; onAuth: (s: Sesion) => void }) {
  const [crear, setCrear] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); setError(""); setBusy(true);
    const datos = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const sesion = await api.request<Sesion>(crear ? "/auth/crear-empresa" : "/auth/login", { method: "POST", body: JSON.stringify(datos) });
      onAuth(sesion);
    } catch { setError("Revisa tus datos o la conexión con FlowSort."); }
    finally { setBusy(false); }
  }

  return <main className="auth auth-reordered">
    <section className="auth-showcase">
      <div className="auth-brandline"><img className="auth-mark" src="/flowsort-logo.png" alt="FlowSort" /><span>FlowSort <small>WORKSPACE</small></span></div>
      <h1>Menos ruido.<br /><em>Más avance.</em></h1>
      <p>Tu trabajo, en orden.</p>
      <div className="auth-visual"><div className="visual-ring" /><div className="visual-card"><span className="live-dot" /> FLUJO EN TIEMPO REAL <strong>+24.8%</strong><small>productividad esta semana</small></div></div>
      <div className="auth-proof"><span><strong>99.9%</strong><small>Disponibilidad</small></span><span><strong>24/7</strong><small>Visibilidad</small></span><span><strong>5</strong><small>Plataformas</small></span></div>
    </section>
    <section className="auth-panel">
      <div className="auth-card-head"><div><div className="auth-kicker">{crear ? "NUEVO ESPACIO" : "BIENVENIDO"}</div><h2>{crear ? "Crea tu espacio" : "Inicia sesión"}</h2><p>{crear ? "Empieza en minutos." : "Continúa tu flujo."}</p></div><div className="auth-orb">✦</div></div>
      <form className="auth-card-form" onSubmit={enviar}>
        {crear && <div className="auth-grid"><label>Empresa<input name="nombreEmpresa" placeholder="Nombre de empresa" required /></label><label>Tu nombre<input name="nombre" placeholder="Nombre completo" required /></label><label className="template-choice">Plantilla inicial<select name="plantillaPreferida" defaultValue="General"><option>General</option><option>Restaurante</option><option>Clínica / Hospital</option><option>Agencia de viajes</option><option>Hotel / Alojamiento</option><option>Taller automotriz</option><option>Inmobiliaria</option><option>Gimnasio</option><option>Salón de belleza / Spa</option><option>Bufete legal</option><option>Servicio técnico / Reparaciones</option></select><small>Podrás cambiarla después.</small></label></div>}
        <label>Email<input name="email" type="email" placeholder="tu@empresa.com" autoComplete="email" required /></label>
        <label>Contraseña<input name="password" type="password" placeholder="Mínimo 10 caracteres" minLength={10} autoComplete={crear ? "new-password" : "current-password"} required /></label>
        {error && <div className="error">{error}</div>}
        <button type="submit" disabled={busy}>{busy ? <><span className="spinner" />Procesando…</> : crear ? "Crear espacio" : "Entrar"}</button>
      </form>
      <div className="auth-switch">{crear ? "¿Ya tienes cuenta?" : "¿Primera vez en FlowSort?"}<button type="button" className="link" onClick={() => { setCrear(!crear); setError(""); }}>{crear ? "Inicia sesión" : "Crea tu workspace"}</button></div>
      <small className="auth-security">Sesión protegida · Datos aislados por empresa</small>
    </section>
  </main>;
}
