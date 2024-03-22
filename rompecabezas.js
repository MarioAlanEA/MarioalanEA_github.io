var select = false; // Variable para controlar si se ha seleccionado una pieza
var c = 'inc'; // Variable para controlar el estado de la acción de cambiar fondo
var pos_s = ''; // Posición de la pieza seleccionada
var id_s = ''; // ID de la pieza seleccionada

var rompecabezas = {
    _arr_pos_r : new Array(), // Array para almacenar posiciones correctas
    _arr_pos_a : new Array(), // Array para almacenar posiciones actuales

    // Método para mostrar el rompecabezas en la página
    _mostrar: function(){
        rompecabezas._arr_pos_r.length = 0;
        var piezas = rompecabezas._get('piezas').value;
        var tb = document.createElement('table');
        // Configuración de la tabla
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
        var tam_img = 300;
        var pos_img = tam_img / ar;
        for(var fil=1;fil<=ar;fil++){
            var tr = document.createElement('tr');
            for(var cel=1;cel<=ar;cel++){
                c++;
                var td = document.createElement('td');
                td.className = 'pieza';
                td.id = 'pos_'+c;
                td.style.width = pos_img+'px';
                td.style.height = pos_img+'px';
                var dbp = document.createElement('div');
                dbp.id = 'val_bp_'+c;
                var pX = -(pos_img * (cel - 1)) + 'px'; // Ajusta la posición X
                var pY = -(pos_img * (fil - 1)) + 'px'; // Ajusta la posición Y
                var p = pX + ' ' + pY; // Combinar las posiciones X e Y para formar la posición de fondo
                td.style.backgroundPosition = p;
                rompecabezas._arr_pos_r.push(p);
                dbp.innerHTML = p;
                dp.appendChild(dbp);
                td.onclick = function(){
                    rompecabezas._cambiaBGP(this.id);
                    rompecabezas._compruebaFin();
                }
                tr.appendChild(td);
            }
            tb.appendChild(tr);
        }
        if(!rompecabezas._get('div_content')){
            var cont = document.createElement('div');
            cont.id = 'div_content';
            cont.appendChild(tb);
            cont.appendChild(dp);
            document.body.appendChild(cont);
        }else{
            rompecabezas._get('div_content').innerHTML = '';
            rompecabezas._get('div_content').appendChild(tb);
            rompecabezas._get('div_content').appendChild(dp);
            rompecabezas._get('posiciones').removeClass('posic');
            rompecabezas._get('posiciones').innerHTML = '';
            rompecabezas._get('posiciones').className = 'posic';
        }
    },

    // Método para mezclar las piezas
    _mezclar: function(){
        var num_alt = null;
        var arr = new Array();
        var resp = 'no';
        var i = -1;
        var repite = 'no';
        var pie = parseInt(rompecabezas._get('piezas').value);
        var pie1 = pie + 1;
        while(arr.length < pie){
            repite = 'no';
            num_alt = Math.floor(Math.random()*pie1);
            if(num_alt != 0){
                if(arr.length == 0){
                    i++;
                    arr[i] = num_alt;
                }else{
                    for(j=0;j<=arr.length-1;j++){
                        if(arr[j] == num_alt){
                            repite = 'si';
                        }
                    }
                    if(repite != 'si'){
                        i++;
                        arr[i] = num_alt;
                    }
                }
            }
        }

        var id = 0;    
        for(k=0; k<=arr.length-1;k++){
            id = k-(-1);
            rompecabezas._get('pos_'+id).style.backgroundPosition = rompecabezas._get('val_bp_'+arr[k]).innerHTML;
        }

        // Limpiar el contenido del resultado
        var resultadoDiv = rompecabezas._get('resultado');
        resultadoDiv.innerHTML = '';
    },

    // Método para cambiar el fondo de una pieza al hacer clic
    _cambiaBGP: function(id){
        if(select == false){
            pos_s = rompecabezas._get(id).style.backgroundPosition;
            id_s = id;
            select = true;
            rompecabezas._get(id_s).style.boxShadow = '1px 1px 14px #FFF,-1px -1px 14px #FFF, 1px -1px 14px #FFF,-1px 1px 14px #FFF';
        }else{
            var pos_n =  rompecabezas._get(id).style.backgroundPosition;
            var id_n = id;
            c = 'com';
            select = false;
        }
     
        if(c == 'com'){ rompecabezas._get(id_n).style.backgroundPosition = pos_s; rompecabezas._get(id_s).style.backgroundPosition = pos_n;
            c = 'inc';
            rompecabezas._get(id_s).style.boxShadow = '';
        }
    },

    // Método para comprobar si se ha completado el rompecabezas
    _compruebaFin: function(){
        var pie = parseInt(rompecabezas._get('piezas').value);
        var fin = false;
        rompecabezas._arr_pos_a.length = 0;
        for(var i=1;i<=pie;i++){
            rompecabezas._arr_pos_a.push(rompecabezas._get('pos_'+i).style.backgroundPosition);
        }
        for(var j=0;j<rompecabezas._arr_pos_r.length;j++){
            if(rompecabezas._arr_pos_r[j] != rompecabezas._arr_pos_a[j]){
                fin = false;
                break;
            }else{
                fin = true;
            }
        }
        
        if(fin){
            var resultadoDiv = rompecabezas._get('resultado');
            resultadoDiv.innerHTML = ''; // Limpiar el contenido previo

            // Crear la imagen y el texto
            var imagen = document.createElement('img');
            imagen.style.width = '200px'; // Ajusta el tamaño de la imagen según sea necesario
            var texto = document.createElement('p');
            texto.textContent = 'data es un album del exitoso productor tainy, es un del genero urbano publicado en 2023 contando con 20 canciones contando con colabraciones de los artitas mas grandes en el genero urbano como bad bunny, rauw alejandro, jhayco, daddy yankee, feid etc. o con otros artistas fuera del genero urbano como julieta venegas y skrillex. El album es un album muy completo llevando a los limites los sonidos que puede tener el genero urbano teniendo sonidos como el reggeton, trap,pop chillwave,R&B alternativo,synthpop, el concepto del album va de sena una mujer robot que no tiene sentimiento, tainy le da sentimientos en forma de data, en lo personal es mi album favorito y una pieza que se merece una oportunidad de ser escuchado, siendo mis canciones preferidas FANTASMA/AVC, VOLVER, SI PREGUNTAS POR MI, SCI-FI, PARANORMAL'; // El texto que deseas mostrar
            resultadoDiv.appendChild(imagen);
            resultadoDiv.appendChild(texto);
        }
    },

    // Método para obtener un elemento por su ID
    _get: function(id){
        return document.getElementById(id);
    }
};

window.onload = function(){
    rompecabezas._mostrar(); // Mostrar el rompecabezas al cargar la página
    rompecabezas._mezclar(); // Mezclar las piezas al cargar la página
    // Configuración de eventos
    rompecabezas._get('piezas').onchange = function(){
        rompecabezas._mostrar();
    };
    rompecabezas._get('mezclar').onclick = function(){
        rompecabezas._mezclar();
    };
};



