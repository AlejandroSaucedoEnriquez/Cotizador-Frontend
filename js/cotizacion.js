const tablacotizacionfinal = document.querySelector("#tablacotizacionfinal");

    function traer(){
        fetch("http://localhost:8080/cotizaciones/1")
        .then(response => response.json())
        .then(data => {
        
            var tabla = document.getElementById('tablacotizacionfinal');
            var tbody = tabla.getElementsByTagName('tbody')[0];
            var totalElement = document.getElementById('total');
            var total = 0;
            var row = tabla.insertRow();
    
    
           
            tbody.innerHTML = '';


            
         // Acceder al arreglo de objetos "items" dentro del objeto JSON
         var items = data.items;
        // Limpiar cualquier contenido previo
            // Iterar sobre los items y agregar filas a la tabla
            items.forEach(function(item) {
              var fila = '<tr>';
              fila += '<td>' + data.id + '</td>';
              fila += '<td>' + data.id + '</td>';
              fila += '<td>' + item.producto.id + '</td>';
              fila += '<td>' + item.producto.nombre + '</td>';
              fila += '<td>' + item.producto.sku + '</td>';
              fila += '<td>' + item.producto.precio + '</td>';
              fila += '<td>' + item.producto.stock + '</td>';
              fila += '<td>' + item.producto.descripcion + '</td>';
              fila += '<td>' + item.producto.categoria + '</td>';
              fila += '<td>' + item.producto.marca + '</td>';
              fila += '<td>' + item.producto.modelo + '</td>';
              fila += '<td>' + item.cantidad + '</td>';
              fila += '<td>' + item.precioUnitario + '</td>';
              fila += '<td>' + item.subtotal + '</td>';
              fila += '<td>' + data.fecha + '</td>';
              fila += '<td>' + item.subtotal + '</td>';
              fila += '</tr>';
              tbody.innerHTML += fila;
      
              // Calcular el total
              total += item.subtotal;

            });
            
            // Mostrar el total
            totalElement.textContent = total.toFixed(2);
        
        })
        //.catch(error => console.error('Error al obtener los datos:', error));
       
    }

    
   
        
      


              