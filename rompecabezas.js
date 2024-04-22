var select = false; // variable para seleccionar una pieza 
var c = 'inc'; // cambia el fondo
var pos_s = ''; // posicion de pieza
var id_s = ''; // pieza seleccionada 
var imageUrl = 'albums/data.jpg'; // imagen principal 

var rompecabezas = {
    _arr_pos_r: new Array(), // arreglo posiciones correctas
    _arr_pos_a: new Array(), // arreglo posiciones actuales

    //mostrar el rompecabezas 
    _mostrar: function () {
        rompecabezas._arr_pos_r.length = 0;
        var piezas = rompecabezas._get('piezas').value;
        var tb = document.createElement('table');
        // tabla
        tb.border = 1;
        tb.align = 'center';
        tb.cellPadding = 0;
        tb.cellSpacing = 0;
        var dp = document.createElement('div');
        dp.id = 'posiciones';
        dp.className = 'posic';
        dp.style.display = 'none'; // Oculta las coordenadas
        var ar = Math.sqrt(piezas);
        var c = 0;
        var tam_img = 300; // Tamaño de la imagen 
        var pos_img = tam_img / ar;

        for (var fil = 1; fil <= ar; fil++) {
            var tr = document.createElement('tr');
            for (var cel = 1; cel <= ar; cel++) {
                c++;
                var td = document.createElement('td');
                td.className = 'pieza';
                td.id = 'pos_' + c;
                td.style.width = pos_img + 'px';
                td.style.height = pos_img + 'px';
                var dbp = document.createElement('div');
                dbp.id = 'val_bp_' + c;
                var pX = -(pos_img * (cel - 1)) + 'px'; // x 
                var pY = -(pos_img * (fil - 1)) + 'px'; // y
                var p = pX + ' ' + pY; // x + y 
                td.style.backgroundImage = 'url(' + imageUrl + ')';
                td.style.backgroundPosition = p;
                rompecabezas._arr_pos_r.push(p);
                dbp.innerHTML = p;
                dp.appendChild(dbp);
                td.onclick = function () {
                    rompecabezas._cambiaBGP(this.id);
                    rompecabezas._compruebaFin();
                }
                tr.appendChild(td);
            }
            tb.appendChild(tr);
        }

        if (!rompecabezas._get('div_content')) {
            var cont = document.createElement('div');
            cont.id = 'div_content';
            cont.appendChild(tb);
            cont.appendChild(dp);
            document.body.appendChild(cont);
        } else {
            rompecabezas._get('div_content').innerHTML = '';
            rompecabezas._get('div_content').appendChild(tb);
            rompecabezas._get('div_content').appendChild(dp);
            rompecabezas._get('posiciones').removeClass('posic');
            rompecabezas._get('posiciones').innerHTML = '';
            rompecabezas._get('posiciones').className = 'posic';
        }
    },

    // funcion de mezclar muejejejejejjejejeje
    _mezclar: function () {
        var num_alt = null;
        var arr = new Array();
        var resp = 'no';
        var i = -1;
        var repite = 'no';
        var pie = parseInt(rompecabezas._get('piezas').value);
        var pie1 = pie + 1;
        while (arr.length < pie) {
            repite = 'no';
            num_alt = Math.floor(Math.random() * pie1);
            if (num_alt != 0) {
                if (arr.length == 0) {
                    i++;
                    arr[i] = num_alt;
                } else {
                    for (j = 0; j <= arr.length - 1; j++) {
                        if (arr[j] == num_alt) {
                            repite = 'si';
                        }
                    }
                    if (repite != 'si') {
                        i++;
                        arr[i] = num_alt;
                    }
                }
            }
        }
        // ciclo licuadora 
        var id = 0;
        for (k = 0; k <= arr.length - 1; k++) {
            id = k - (-1);
            rompecabezas._get('pos_' + id).style.backgroundPosition = rompecabezas._get('val_bp_' + arr[k]).innerHTML;
        }

        // limpia con luis miguel 
        var resultadoDiv = rompecabezas._get('resultado');
        resultadoDiv.innerHTML = '';
    },

    // Método para cambiar el fondo de una pieza al hacer clic
    _cambiaBGP: function (id) {
        if (select == false) {
            pos_s = rompecabezas._get(id).style.backgroundPosition;
            id_s = id;
            select = true;
            rompecabezas._get(id_s).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
        } else {
            var pos_n = rompecabezas._get(id).style.backgroundPosition;
            var id_n = id;
            c = 'com';
            select = false;
        }

        if (c == 'com') {
            rompecabezas._get(id_n).style.backgroundPosition = pos_s;
            rompecabezas._get(id_s).style.backgroundPosition = pos_n;
            c = 'inc';
            rompecabezas._get(id_s).style.boxShadow = '';
        }
    },

    // Método para comprobar si se ha completado el rompecabezas
_compruebaFin: function () {
    var pie = parseInt(rompecabezas._get('piezas').value);
    var fin = false;
    rompecabezas._arr_pos_a.length = 0;
    for (var i = 1; i <= pie; i++) {
        rompecabezas._arr_pos_a.push(rompecabezas._get('pos_' + i).style.backgroundPosition);
    }
    for (var j = 0; j < rompecabezas._arr_pos_r.length; j++) {
        if (rompecabezas._arr_pos_r[j] != rompecabezas._arr_pos_a[j]) {
            fin = false;
            break;
        } else {
            fin = true;
        }
    }

    if (fin) {
        var resultadoDiv = rompecabezas._get('resultado');
        resultadoDiv.innerHTML = ''; // escoba 

        var texto = document.createElement('p');
        texto.textContent = 'Felicidades, lo resolviste :)'; //cambialo 
        texto.style.textAlign = 'center';
        resultadoDiv.appendChild(texto);
    }
},

    // Método para obtener un elemento por su ID
    _get: function (id) {
        return document.getElementById(id);
    },

    // funcion donde tu puedes subir tu imagen
    _cargarImagen: function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var img = new Image(); //cambia la original por la nueva
            img.src = readerEvent.target.result;

            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                // estatura 
                canvas.width = 300;
                canvas.height = 300;

                // Dibuja la imagen en el canvas con el tamaño ajustado
                ctx.drawImage(img, 0, 0, 300, 300);

                // cambia la ruta de la img
                imageUrl = canvas.toDataURL('image/png');

                //lo pasa al rompecabeza
                rompecabezas._mostrar();
                rompecabezas._mezclar();
            };
        };

        reader.readAsDataURL(file);
    }
};

window.onload = function () {
    rompecabezas._mostrar(); // Mostrar
    rompecabezas._mezclar(); // Mezclar
    // Configuración de eventos
    rompecabezas._get('piezas').onchange = function () {
        rompecabezas._mostrar();
    };
    rompecabezas._get('mezclar').onclick = function () {
        rompecabezas._mezclar();
    };

    //  carga de imagen
    var imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', rompecabezas._cargarImagen);
};