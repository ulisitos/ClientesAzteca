$(document).ready(function () {
	tabla();

});

// listar

function tabla() {

	$.ajax({ // ajax es una metodologia de trabajo
		method: 'get', // utilizar el metodo que estoy utiliando en mi back
		url: 'http://localhost:9001/ClientesWs/listar', // url a consumir
		contentType: 'application/json; charset=UTF-8',
		dataType: 'json',

		success: function (respuesta) {
			console.log("respuesta del servidor" + JSON.stringify(respuesta)); // JSON.stringify --> convierte un objeto a un valor de java script 
			var cuerpo;
			for (var i = 0; i < respuesta.length; i++) { // recorrer la longitud de la respuesta que me manda el servidor 
				cuerpo += '<tr>' + //concateno y agrego elemento a mi tabla
					'<td>' + respuesta[i].id + '</td>' +
					'<td>' + respuesta[i].nombre + '</td>' +
					'<td>' + respuesta[i].fechaNacimiento + '</td>' +
					'<td>' + respuesta[i].celular + '</td>' +
					'<td>' + respuesta[i].correo + '</td>' +									
					'<td><a type="button" id="editar" title="Editar" data="' + respuesta[i].id + '"><i style="color: blue" class="bi bi-pencil-square"></i></a>' +
					'&nbsp;&nbsp;&nbsp;&nbsp;<a type="button" id="eliminar" title="Eliminar" data="' + respuesta[i].id + '"><i style="color: red"class="bi bi-trash"></i></a></td>' +
					'</tr>'
			}// cierre del for
			$('#tbody').html(cuerpo);

		},
		error: function (resultado) {
			console.log("error al listar");
		}
	});
};

// Editar --> pimero hay que buscar
$('#tbody').on('click', '#editar', function () {
	var id = $(this).attr('data');
	console.log("id = " + JSON.stringify(id));

	var cliente = { "id": id };

	$.ajax({
		type: 'ajax',
		method: 'post',
		url: 'http://localhost:9001/ClientesWs/buscarCliente',
		data: JSON.stringify(cliente),
		contentType: 'application/json; charset=UTF-8',

		success: function (respuesta) {
			console.log("se encontro el objeto a editar" + JSON.stringify(respuesta));
			$('#idE').val(id);
			$('#nombreE').val(respuesta.nombre);
			$('#fechaE').val(respuesta.fechaNacimiento);
			$('#celularE').val(respuesta.celular);
			$('#correoE').val(respuesta.correo);			
			$('#modalEditar').modal('show');

		},
		error: function (resultado) {
			console.log("error al buscar");
		}
	});
});

// EDITAR
$('#btnEditar').click(function () {
	var id = $('#idE').val();
	var nombre = $('#nombreE').val();
	var fechaNacimiento = $('#fechaE').val();
	var celular = $('#celularE').val();
	var correo = $('#correoE').val();

	var json = { "id": id, "nombre": nombre, "fechaNacimiento": fechaNacimiento, "celular": celular, "correo": correo}
	console.log("auto a editar" + JSON.stringify(json));


		$.ajax({
			type: 'ajax',
			method: 'put',
			url: 'http://localhost:9001/ClientesWs/editarCliente',
			data: JSON.stringify(json),
			contentType: 'application/json; charset=UTF-8',
			success: function (respuesta) {
				$('#modalEditar').modal('hide');
				$('#alert').html("Los cambios se guardaron").fadeIn().delay(3000).fadeOut('snow');
				tabla();
			},
			error: function (resultado) {
				console.log("error al editar");
			}
		});

	
});

// Eliminar --> pimero hay que buscar
$('#tbody').on('click', '#eliminar', function () {
	var id = $(this).attr('data');
	console.log("id = " + JSON.stringify(id));

	var cliente = { "id": id };

	$.ajax({
		type: 'ajax',
		method: 'post',
		url: 'http://localhost:9001/ClientesWs/buscarCliente',
		data: JSON.stringify(cliente),
		contentType: 'application/json; charset=UTF-8',

		success: function (respuesta) {
			console.log("se encontro el objeto a eliminar" + JSON.stringify(respuesta));
			$('#idD').val(id);
			$('#nombreD').val(respuesta.nombre);
			$('#modalEliminar').modal('show');
		},
		error: function (resultado) {
			console.log("error al buscar");
		}
	});
});

//ELIMINAR
$('#btnEliminar').click(function () {
	var id = $('#idD').val();
	var nombre = $('#nombreD').val();
	var fechaNacimiento = $('#fechaD').val();
	var celular = $('#celularD').val();
	var correo = $('#correoD').val();
	
	var json = { "id": id, "nombre": nombre, "fechaNacimiento": fechaNacimiento, "celular": celular, "correo": correo}	
	$.ajax({
		type: 'ajax',
		method: 'delete',
		url: 'http://localhost:9001/ClientesWs/eliminarCliente',
		data: JSON.stringify(json),
		contentType: 'application/json; charset=UTF-8',
		success: function (respuesta) {
			$('#modalEliminar').modal('hide');
			$('#alert').html("Se eliminó el cliente con exito").fadeIn().delay(3000).fadeOut('snow');
			tabla();
		},
		error: function (resultado) {
			console.log("error al eliminar");
		}
	});
});



//guardar
$('#btnGuardarAbrir').click(function () {
	$('#modalGuardar').modal('show');
});

$('#btnGuardar').click(function () {
	var id = $('#inputId').val();
	var nombre = $('#inputNombre').val();
	var fechaNacimiento = $('#inputFecha').val();
	var celular = $('#inputCelular').val();
	var correo = $('#inputCorreo').val();

	if(id == ''){
		alert("ingrese el id");
	} else if (nombre == ''){
		alert("ingrese la marca");
	} else if (correo != '@'){
		alert("ingrese un correo valido");
	} else if(fechaNacimiento = ''){
		alert("ingresa la fecha de nacimiento");
	}else if(celular = ''){
		alert("ingrese un número de celular");
	}else if(correo = ''){
		alert("ingrese un correo electronico");
	}
	else{
		var json = { "id": id, "nombre": nombre, "fechaNacimiento": fechaNacimiento, "celular": celular, "correo": correo}
	$.ajax({
		type: 'ajax',
		method: 'post',
		url: 'http://localhost:9001/ClientesWs/guardarCliente',
		data: JSON.stringify(json),
		contentType: 'application/json; charset=UTF-8',
		success: function (respuesta) {
			$('#modalGuardar').modal('hide');
			$('#alert').html("Se guardó el cliente con exito").fadeIn().delay(3000).fadeOut('snow');
			tabla();
		},
		error: function (resultado) {
			console.log("error al guardar");
		}
	});
	}
	

});