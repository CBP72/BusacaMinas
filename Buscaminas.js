let alto=10;
let ancho=10;
let bombas=15;
let bombasPintadas=0;
let matrizFinal
let bombasUser=15

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

            let id='id="'+i+'-'+j+'"'
            let onClick='onclick="desvelar('+i+','+j+')"'
            let oncontextmenu= "oncontextmenu='ponerBandera("+i+','+j+")'"
            if(matrizRellena[i][j]=='x'){  
                bombasPintadas++;
                pintarTabla+="<td "+id+" class='bomba' align='center' "+oncontextmenu+" "+onClick+">&nbsp</td>";
            }else if(matrizRellena[i][j]=='borde'){
                pintarTabla+="<td "+id+" class='error' align='center'>&nbsp</td>";
            }
            else{
               
                pintarTabla+="<td "+id+" class='vacio' align='center'"+oncontextmenu+" "+onClick+">&nbsp</td>";
            }
        }
        pintarTabla+="</tr>"
    }
    tabla.innerHTML= pintarTabla
    bombas=15;
    matrizFinal=matrizRellena
    
}

function ponerBandera(i,j){
    
    document.getElementById(i+'-'+j).innerText='🚩'
    
    
    return false

}



function desvelar(i,j){
    
    if (matrizFinal[i][j]!='x'){
        if(matrizFinal[i][j]==0){
            desvelarCeros(matrizFinal,i,j)
        }else if(matrizFinal[i][j]==1){
            document.getElementById(i+'-'+j).innerText=matrizFinal[i][j]
            document.getElementById(i+'-'+j).setAttribute('style',"color: blue;",)
        }else if(matrizFinal[i][j]==2){
            document.getElementById(i+'-'+j).innerText=matrizFinal[i][j]
            document.getElementById(i+'-'+j).setAttribute('style',"color: green;",)
        }else if(matrizFinal[i][j]==3){
            document.getElementById(i+'-'+j).innerText=matrizFinal[i][j]
            document.getElementById(i+'-'+j).setAttribute('style',"color: red;",)
        }
        
        
        
        else{
            document.getElementById(i+'-'+j).innerText=matrizFinal[i][j]
        }
        
        
    }else{//pierde y enseña todo el tablero
        alert('Bomba')
        let tabla= document.getElementById('tablero');
        let pintarTabla="";
        for(let i=1; i<ancho+1;i++){
            pintarTabla+="<tr>"
            for(let j=1;j<alto+1;j++){
    
                let id='id="'+i+'-'+j+'"'
                let onClick='onclick="desvelar('+i+','+j+')"'
                if(matrizFinal[i][j]=='x'){  
                    bombasPintadas++;
                    pintarTabla+="<td "+id+" class='bomba' "+onClick+" >x</td>";
                }else if(matrizFinal[i][j]=='borde'){
                    pintarTabla+="<td "+id+" class='error'>"+matrizFinal[i][j]+"</td>";
                }
                else{
                   
                    pintarTabla+="<td "+id+" class='vacio' "+onClick+">"+matrizFinal[i][j]+"</td>";
                }
            }
            pintarTabla+="</tr>"
        }
        tabla.innerHTML= pintarTabla
    }

}//desvelar

function desvelarCeros(matrizADesvelar, i,j){
    
    i= Number(i)
    j=Number(j)
    
    document.getElementById(i+'-'+j).innerText=matrizADesvelar[i][j];
    if(matrizADesvelar[i][j]==0){
        
            
        if(matrizADesvelar[i-1][j-1]=='0')desvelarCeros(matrizADesvelar,i-1,j-1)
        if(matrizADesvelar[i-1][j]=='0') desvelarCeros(matrizADesvelar,i-1,j)
        if(matrizADesvelar[i-1][j+1]=='0') desvelarCeros(matrizADesvelar,i-1,j+1)
    
        if(matrizADesvelar[i][j-1]=='0') desvelarCeros(matrizADesvelar,i,j-1)
        if(matrizADesvelar[i][j+1]=='0') desvelarCeros(matrizADesvelar,i,j+1)

        if(matrizADesvelar[i+1][j-1]=='0') desvelarCeros(matrizADesvelar,i+1,j-1)
        if(matrizADesvelar[i+1][j]=='0') desvelarCeros(matrizADesvelar,i+1,j)
        if(matrizADesvelar[i+1][j+1]=='0') desvelarCeros(matrizADesvelar,i+1,j+1)
    


    }
    

}










function generarBombas(){
   
    let matrizConBomba= new Array(ancho+2)

    bombasUser=Number(prompt('Introduca el numero de bombas deseado','15'))


    
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

        while(Number(bombasUser)!=Number(bombasPintadas)){
            bombas=bombasUser
            bombasPintadas=0;
            for(let i=1;i<matrizConBomba.length-1;i++){
                
                for (let j=1;j<matrizConBomba[i].length-1;j++){
                    if(ponerBomba()){
                        matrizConBomba[i][j]='x';
                        bombas--;
                        bombasPintadas++;
                    }

                    else matrizConBomba[i][j]='_';
                }
            }
            bombas=bombasUser
            console.log('Matriz con bomba : '+matrizConBomba)
        
            console.log(Number(bombasUser)!=Number(bombasPintadas))
        }
    
   
    pintar(matrizConBomba,'test1')
    let matrizAcabado=generarMatriz(matrizConBomba)
    //
    console.log(matrizAcabado)
    console.log('return')
    pintar(matrizAcabado,'test2')
    return matrizAcabado;
}


function ponerBomba(){
    let Probabilidad= (ancho*alto)/bombasUser*13
    if(Probabilidad>90) Probabilidad=99
    let random=(Math.ceil(Math.random()*100))
    if(bombas!=0){
        
        if(random>Probabilidad){
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



