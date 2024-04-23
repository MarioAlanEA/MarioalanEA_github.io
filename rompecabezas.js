// CODIGO HECHO POR LUIS MIGUEL (el me dio las fuerzas para mejorarlo)

var select = false; // Variable para seleccionar una pieza
var c = 'inc'; // cambio de fondo 
var pos_s = ''; // posicion de pieza
var id_s = ''; // pieza seleccionada 
var imageUrl = 'albums/data.jpg'; // data

var rompecabezas = {
    _arr_pos_r: [], // Arreglo posiciones correctas
    _arr_pos_a: [], // Arreglo posiciones actuales

    // rompecabezas.show
    _mostrar: function () {
        // lavadora
        rompecabezas._arr_pos_r.length = 0;

        // num piezas seleccionadas
        var piezas = rompecabezas._get('piezas').value;
        
        //tabla 
        var tb = document.createElement('table');
        tb.border = 1;
        tb.align = 'center';
        tb.cellPadding = 0;
        tb.cellSpacing = 0;

        // coordenadas de las piezas que no se miran
        var dp = document.createElement('div');
        dp.id = 'posiciones';
        dp.className = 'posic';
        dp.style.display = 'none';

        // tamaño pieza
        var ar = Math.sqrt(piezas);
        var tam_img = 300; // Tamaño de la imagen principal
        var pos_img = tam_img / ar;

        // crea las piezas 
        var c = 0; // Contador de piezas
        for (var fil = 1; fil <= ar; fil++) {
            var tr = document.createElement('tr');
            for (var cel = 1; cel <= ar; cel++) {
                c++;
                var td = document.createElement('td');
                td.className = 'pieza';
                td.id = 'pos_' + c;
                td.style.width = pos_img + 'px';
                td.style.height = pos_img + 'px';

                // mostrar las coordenadas de fondo no se ve otra vez
                var dbp = document.createElement('div');
                dbp.id = 'val_bp_' + c;

                // Calcular la posición de fondo para la imagen principal
                var pX = -(pos_img * (cel - 1)) + 'px';
                var pY = -(pos_img * (fil - 1)) + 'px';
                var p = pX + ' ' + pY;
                td.style.backgroundImage = 'url(' + imageUrl + ')';
                td.style.backgroundPosition = p;

                // la posición al arreglo de posiciones correctas
                rompecabezas._arr_pos_r.push(p);

                dbp.innerHTML = p;
                dp.appendChild(dbp);

                // evento del clik para cambiar las piezas
                td.onclick = function () {
                    rompecabezas._cambiaBGP(this.id);
                    rompecabezas._compruebaFin();
                }

                // Agregar la pieza a la fila de la tabla
                tr.appendChild(td);
            }
            // Agregar la fila a la tabla
            tb.appendChild(tr);
        }

        // Insertar la tabla y el div de posiciones
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

    // Función para mezclar las piezas del rompecabezas
    _mezclar: function () {
        var piezas = rompecabezas._get('piezas').value;
        var piezasTotal = parseInt(piezas);
        var piezasOrdenadas = Array.from(Array(piezasTotal).keys());

        // Mezclar aleatoriamente
        var piezasMezcladas = piezasOrdenadas.sort(() => Math.random() - 0.5);

        // Actualizar la posición de cada pieza
        piezasMezcladas.forEach(function (num, index) {
            var id = index + 1;
            rompecabezas._get('pos_' + id).style.backgroundPosition = rompecabezas._get('val_bp_' + (num + 1)).innerHTML;
        });

        // Restablecer 
        select = false;

        // Desbloquear el movimiento de las piezas
        for (var j = 1; j <= piezasTotal; j++) {
            rompecabezas._get('pos_' + j).onclick = function () {
                rompecabezas._cambiaBGP(this.id);
                rompecabezas._compruebaFin();
            };
        }

        // licuadora
        var resultadoDiv = rompecabezas._get('resultado');
        resultadoDiv.innerHTML = '';
    },

    // neto.dios
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
        }

        if (c == 'com') {
            rompecabezas._get(id_n).style.backgroundPosition = pos_s;
            rompecabezas._get(id_s).style.backgroundPosition = pos_n;
            c = 'inc';
            rompecabezas._get(id_s).style.boxShadow = '';
            select = false;
        }
    },

    // esta completo? i ron nouw esto lo checa
    _compruebaFin: function () {
        var piezas = parseInt(rompecabezas._get('piezas').value);
        var fin = true;

        // esta correcto? i ron nouw esto lo checa
        for (var i = 1; i <= piezas; i++) {
            if (rompecabezas._get('pos_' + i).style.backgroundPosition != rompecabezas._get('val_bp_' + i).innerHTML) {
                fin = false;
                break;
            }
        }

        // aqui va el texto cuando lo termines
        if (fin) {
            var resultadoDiv = rompecabezas._get('resultado');
            resultadoDiv.innerHTML = '';

            var texto = document.createElement('p');
            texto.textContent = 'Felicidades, lo resolviste :)'; // cambia ese texto por favor no se te olvide
            texto.style.textAlign = 'center';
            resultadoDiv.appendChild(texto);

            // bloqueau las piezaas
            for (var j = 1; j <= piezas; j++) {
                rompecabezas._get('pos_' + j).onclick = null;
            }
        }
    },

    // esta funcion me hizo pegarme un tiro pero es para que los que juegen puedan subir su imagen
    _cargarImagen: function (event) {
        var file = event.target.files[0];
        var reader = new FileReader();

        reader.onload = function (readerEvent) {
            var img = new Image();
            img.src = readerEvent.target.result;

            img.onload = function () {
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');

                //tamaño de la imagen subida
                canvas.width = 300;
                canvas.height = 300;

                //SUAVE COMO ME MATA TU MIRADA 
                ctx.drawImage(img, 0, 0, 300, 300);

                //cambia la ruta de la img original
                imageUrl = canvas.toDataURL('image/png');

                // mezcla y enseña la new imagen
                rompecabezas._mostrar();
                rompecabezas._mezclar();
            };
        };

        // CUANDO CALIENTA EL SOL AQUI EN LA PLAYAAA
        reader.readAsDataURL(file);
    },

    // nueva id de la imagem
    _get: function (id) {
        return document.getElementById(id);
    }
};

window.onload = function () {
    rompecabezas._mostrar(); // en cuanto entras enseña 
    rompecabezas._mezclar(); // hace lo mismo pero mezcla

    //NO SE TUUUUUUUU PERO YOOOOOOO TE BUSCO EN CADA AMANECEEEEEER *llora*
    rompecabezas._get('piezas').onchange = function () {
        rompecabezas._mostrar();
    };
    rompecabezas._get('mezclar').onclick = function () {
        rompecabezas._mezclar();
    };

    //esto hace que cargue la imagen del que la subio
    var imageUpload = document.getElementById('imageUpload');
    imageUpload.addEventListener('change', rompecabezas._cargarImagen);
};

//denme dinero para ir a ver a luis miguel por favor

//No sé qué está pasando
//Que todo está al revés
//Que tú ya no me besas como ayer
//Que anoche en la playa
//No me dejaste amarte
//Algo entre nosotros no va bien
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No busques más disculpas
//No siento tus caricias
//Ya no eres la misma que yo amé
//Te veo tan distante
//Te siento tan distinta
//Pues hay dentro de ti otra mujer
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//Ya no sé, ya no sé, ya no sé qué va a pasar
//Ya no sé, ya no sé, ya no sé qué voy a hacer
//Ya no sé, ya no sé, ya no sé qué va a pasar
//Ya no sé, ya no sé, ya no sé qué voy a hacer
//Noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No sé qué está pasando
//Que todo está al revés
//Pero ya no lucho, como ves
//Ayer no te importaba
//Amar bajo la lluvia
//Hoy no te divierte, ya lo sé
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas
//No culpes a la noche
//Playa
//No culpes a la lluvia
//Será que no me amas, no, no, no
//(Noche)
//No culpes a la (Playa)
//No culpes a la (Lluvia)
//Será que no me (Amas)
//(Noche)
//(Playa)
//(Lluvia)
//(Amas)
//No culpes a la noche
//No culpes a la playa
//No culpes a la lluvia
//Será que no me amas, no, no, no
//(Noche) No culpes a la noche
//(Playa) No culpes a la playa
//(Lluvia) No culpes a la lluvia
//(Amas) No, no, no
//(Noche) No culpes a la
//(Playa) No culpes a la
//(Lluvia) Será que no me amas
//(Amas) No, no, no
//(Noche)
//(Playa)
//(Lluvia)
//(Amas)
//(Noche)
//(Playa)
//(Lluvia)
//(Amas)
