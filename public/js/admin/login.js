function redirigir() {
    // Obtén el valor ingresado por el usuario
    let usuario = document.getElementById('usuario').value;
    let contraseña = document.getElementById('contraseña').value;

    // Verifica si el valor cumple con una condición específica (puedes personalizarla)
    if (usuario == 'Sommer2126' && contraseña == 'yovanina2621') {
        // Redirige a otra página si se cumple la condición
        window.location.href = '../../templates/admin/templates/opciones.html';
    } else {
        alert('Usuario o contraseña incorrectos.Por favor, inténtelo de nuevo.');
    }
}