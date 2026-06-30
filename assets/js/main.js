// PartyRooms — landing page interactions

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('waitlistForm');
  const note = document.getElementById('waitlistNote');
  const input = document.getElementById('waitlistEmail');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = input.value.trim();

    if (!email) return;

    // TODO: conectar a un backend real (Firebase / Supabase / Formspree)
    // para guardar correos de la lista de espera.
    console.log('Correo en lista de espera:', email);

    note.textContent = '¡Listo! Te avisaremos apenas se abran las primeras salas.';
    note.classList.add('success');
    form.reset();
  });
});
