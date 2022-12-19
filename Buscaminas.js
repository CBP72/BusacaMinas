let alto=10;
let ancho=10;
let bombas=15;
let bombasPintadas=0;

window.addEventListener("load",inicio)

function inicio(){
    pintarTablaVacia()
    document.getElementById('start').addEventListener('click',pintarTablaRellena)
    document.getElementById('resetearTabla').addEventListener('click',pintarTablaVacia)
}




function pintarTablaVacia(){
    let tabla= document.getElementById('tablero');
    let pintarTabla="";
    for(let i=0; i<alto;i++){
        pintarTabla+="<tr>"
        for(let j=0;j<ancho;j++){
            pintarTabla+="<td class='vacio'> </td>";
        }
        pintarTabla+="</tr>"
    }
    tabla.innerHTML= pintarTabla
}
function pintarTablaRellena(){
    let tabla= document.getElementById('tablero');
    let pintarTabla="";
    bombasPintadas=0;
    let matrizRellena=generarBombas()
    for(let i=1; i<ancho+1;i++){
        pintarTabla+="<tr>"
        for(let j=1;j<alto+1;j++){
            let onClick= 'onclick="mostrar('+i+','+j+')"';
            let id='id="'+i+'-'+j+'"'
            if(matrizRellena[i][j]=='x'){  
                bombasPintadas++;
                pintarTabla+="<td  class='bomba' "+onClick+id+"></td>";
            }else if(matrizRellena[i][j]=='borde'){
                pintarTabla+="<td class='error'>"+matrizRellena[i][j]+"</td>";
            }
            else{
               
                pintarTabla+="<td class='vacio'"+onClick+id+"></td>";
            }
        }
        pintarTabla+="</tr>"
    }
    tabla.innerHTML= pintarTabla
    bombas=15;
    cambiarBombasPintadas(bombasPintadas)    
}

function cambiarBombasPintadas(bombasPintadas){

}

function desvelar(i,j){
    document.getElementById()


}










function generarBombas(){
   
    let matrizConBomba= new Array(ancho+2)

    let bombasUser=Number(prompt('Introduca el numero de bombas deseado','15'))
    alert(bombasUser)
    alert(bombasPintadas)
    alert(!Number(bombasUser)==Number(bombasPintadas))

    while(!bombasUser==bombasPintadas){
        alert('bombas'+bombas+'          bombasUser  '+bombasUser)
        bombasPintadas=0
                //iniciamos matriz con 2 de alto y ancho adicional 
        for(let i=0;i<matrizConBomba.length;i++){
            matrizConBomba[i]= new Array(alto+2)
            for (let j=0;j<matrizConBomba[i].length;j++){
                
                    matrizConBomba[i][j]='Borde '+i+','+j;
            }
        }
        pintar(matrizConBomba,'test3')
            //recorremos excepto los bordes y ponemos bombas
        for(let i=1;i<matrizConBomba.length-1;i++){
            
            for (let j=1;j<matrizConBomba[i].length-1;j++){
                if(ponerBomba()){
                    matrizConBomba[i][j]='x';
                    bombas--;
                    bombasPintadas++
                }

                else matrizConBomba[i][j]='_';
            }
        }
        bombas=bombasUser
        console.log('Matriz con bomba : '+matrizConBomba)
    }
    
   
    pintar(matrizConBomba,'test1')
    let matrizAvabado=generarMatriz(matrizConBomba)
    //
    console.log(matrizAvabado)
    console.log('return')
    return matrizAvabado;
}


function ponerBomba(){
    let Probabilidad= (ancho*alto)/10
    let random=(Math.ceil(Math.random()*100))
    if(bombas!=0){
        
        if(random<Probabilidad){
            bombas--
            return true;
        }
        
    }
    return false
}

//comprobamos si hay bomba alrededor de la casilla
function generarMatriz(matriz){
    console.log('generarMatriz'+ matriz,matriz)
    let maxI=ancho+2
    let maxJ=alto +2
    //console.log('lo pide sbm '+ matriz,matriz)
    //alert('antes del error')
    pintar(matriz,'test4')
    for(let i=1;i<maxI-1;i++){
        
        for (let j=1;j<maxJ-1;j++){
                matriz[i][j]=comprobarAlrededores(matriz,i,j)
                
            

            



        }
    }

    console.log('generarMatriz despuess del bucle'+ matriz)
    pintar(matriz,'test2')
    return matriz;

}
function comprobarAlrededores(matrizComprobar, i,j){
    let cont=0;
    i= Number(i)
    j=Number(j)
    
    if(matrizComprobar[i][j]!='x'){
        
            
        if(matrizComprobar[i-1][j-1]=='x')cont++;
        if(matrizComprobar[i-1][j]=='x') cont++;
        if(matrizComprobar[i-1][j+1]=='x') cont++;
    
        if(matrizComprobar[i][j-1]=='x') cont++;
        if(matrizComprobar[i][j+1]=='x') cont++;

        if(matrizComprobar[i+1][j-1]=='x') cont++;
        if(matrizComprobar[i+1][j]=='x') cont++
        if(matrizComprobar[i+1][j+1]=='x') cont++
        }
    else cont='x'
    console.log(cont)
    return cont;

}



function pintar(matrizTest,id){
    let salida="";
    
    for(let i=0;i<ancho+2;i++){
        salida+="<tr>"
        for(let j=0;j<alto+2;j++){
            salida+="<td>"+matrizTest[i][j]+"</td>"
        }
        salida+="</tr>"
    }
    document.getElementById(id).innerHTML=salida;
}



