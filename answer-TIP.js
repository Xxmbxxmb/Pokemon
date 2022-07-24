/*
OJO No nos sirve buscar directo el valor menor, porque puede estar despues del mayor valor, hay que respetar el orden

[ 4, 3, 2, 5, 11]
  ^

valor maximo 11
valor minimo 2
ganancia 9


valor de las acciones = [11, 4, 3, 2, 5]
  hora                    0  1  2  3  4

valor maximo 11
valor minimo 2
ganancia  3

*/

function MaxValue(shares) {
    //Vamos a suponer como hipotesis que mi mayor ganancia puede ser comprando en la primer posicion y vendiendo en la segunda
    // Tomar el valor en [i], luego guardar la diferencia con la siguiente posicion en una variable
    
      console.log(shares);
      let maxProfit = shares[1] - shares[0];
      console.log(maxProfit);
    // luego comparar con todas las defirencias siguientes, si es mayor la sustituyo, sino la conservo.
    
      for (let i = 0; i < shares.length - 1; i++) {
          //-1 porque el 11 sirve como valor de venta pero no de compra
    
        const buy = shares[i];
        // declaro la posicion como mi variable de compra
        console.log(buy);
    
        // OJO ---> no nos sirve iterar sobre todo, porque tengo que respetar el orden, siempre por delante de i 
        for (let j = i + 1; j < shares.length; j++) {
          const sell = shares[j];
          // la posicion siguiente sera mi posible venta
          console.log(sell);
    
          const actualProfit = sell - buy //voy obteniendo el valor paso a paso
          console.log(actualProfit)
    
              // y lo comparo con quien supuse mi mayor ganancia
          if(actualProfit > maxProfit) maxProfit = actualProfit
          console.log(maxProfit)
        }
      }
      return maxProfit
    }
    
    console.log(MaxValue([4, 3, 2, 5, 11])); // (9)
    
    
    
    function MaxValueRefactor(shares) {
    
      let minBuy = shares[0]
      console.log(minBuy)
      let maxProfit = -Infinity
    
      for (let i = 1; i < shares.length; i++){
        const sell = shares[i]
        console.log(sell)
        const actualProfit = sell - minBuy
        console.log(minBuy)
        console.log(actualProfit)
    
       // if (shares[0] > shares[i+1]) minBuy = shares[i+1]
        if (sell < minBuy) minBuy = sell
        console.log(minBuy)
        if (actualProfit > maxProfit) maxProfit = actualProfit
        console.log(maxProfit)
      }
      return maxProfit
    }
    
    console.log(MaxValueRefactor([4, 3, 2, 5, 11])); // (9)
    
    
    
    function MaxValueRefactorLimpio(shares) {
      let minBuy = shares[0]
      let maxProfit = -Infinity
      for (let i = 1; i < shares.length; i++){
        const sell = shares[i]
        const actualProfit = sell - minBuy
        if (sell < minBuy) minBuy = sell
        if (actualProfit > maxProfit) maxProfit = actualProfit
      }
      return maxProfit
    }
    
    console.log(MaxValueRefactor([4, 3, 2, 5, 11])); // (9)



    // --------
    function HasBalanceBrackets(string) {
        console.log(string);
        // Your code here:
        const apertura = ["{", "[", "("];
        const cierre = ["}", "]", ")"];
      
        let stack = [];
      
        for (let i = 0; i < string.length; i++) {
          let bracket = string[i];
          console.log(bracket);
      
          if (apertura.includes(bracket)) {
            console.log(bracket);
            stack.push(bracket);
            console.log(stack);
          }
      
          if (cierre.includes(bracket)) {
            console.log(bracket);
            const index = cierre.indexOf(bracket);
            console.log(index);
            const par = apertura[index];
            console.log(par);
      
            const ultimoAbierto = stack[stack.length - 1];
            console.log(ultimoAbierto);
      
            if (ultimoAbierto === par) {
              stack.pop();
            } else return false;
          }
        }
        if (stack.length) return false;
        else return true;
      }
      
      console.log(HasBalanceBrackets("()")); // (true)
      //console.log (HasBalanceBrackets('{[(])}')) // (false)
      //console.log (HasBalanceBrackets('{[(')) // (false)
      //console.log (HasBalanceBrackets('{[([{()[]{}}])]}')) // (true)
      //console.log (HasBalanceBrackets('{[]}}')) // (false)
      
      function balanced(string) {
        let stack = [];
        const validBrackets = {
          "{" : "}",
          "[": "]",
          "(": ")",
        };
      
        for (const bracket of string) {
          if (validBrackets[bracket]) stack.push(bracket);
          else if (validBrackets[stack.pop()] !== bracket) return false
      // else {
      //   let ultimoAbierto = stack[stack.length - 1];
      //   if (validBrackets[ultimoAbierto] === bracket) stack.pop();
      //   else return false;
      // }
        }
      //   console.log(stack.length)
      // if (stack.length) return false;
      // else return true;
      
       //return stack.length ? false : true
       //console.log(stack.length)
        return !stack.length
      }
      
      console.log (balanced("()")); // (true)
      //console.log (balanced('{[(])}')) // (false)
      console.log (balanced('{[(')) // (false)
      console.log (balanced('{[([{()[]{}}])]}')) // (true)
      //console.log (balanced('{[]}}')) // (false)
      
      
      function balancedRefactor(string) {
        let stack = [];
        const validBrackets = {
          "{": "}",
          "[": "]",
          "(": ")",
        };
        for (const bracket of string) {
          if (validBrackets[bracket]) stack.push(bracket);
          else if (validBrackets[stack.pop()] !== bracket) return false
        }
        return !stack.length
      }











    // ----



    

function SolveGraph(graph, start, end, visited = []) {
    if (visited.includes(start)) return false;
    visited.push(start);
    for (const node of graph[start]) {
         if (node === end) return true;
      if(SolveGraph(graph, node, end, visited) === true) return true ;
    }
    return false;
  }
  
  const graph = {
    a: ["c"], // llama c y se queda esperando
    b: ["c"],
    c: ["s", "r"], // llama a s y se queda esperando
    d: ["a"],
    s: ["a", "c"],
    r: ["d"],
    z: ["z"],
  };
  
  console.log(SolveGraph(graph, 'a', 'c')) // (true)
  console.log(SolveGraph(graph, "a", "r")); // (true)
  console.log(SolveGraph(graph, 'z', 'c')) // 
  
  //console.log(SolveGraph(graph, 'a', 'd')) // (true)
  //console.log(SolveGraph(graph, 's', 'b')) // (false)
  
  
  function graphRefactor(graph, start, end, visited = {}) {
  console.log(visited)
    if (visited[start]) return;
    visited[start] = true;
  
    for (const node of graph[start]) {
      if (node === end) return true;
      if (graphRefactor(graph, node, end, visited) === true) return true;
    }
    return false;
  }
  
  console.log(graphRefactor(graph, 'a', 'r')) // (true)
  //console.log(graphRefactor(graph, 'z', 'c')) // 

  

  function solveGraphBFS(graph, start, end, visited = {}, queue = []) {
    if (!visited[start]) {
      for (let i = 0; i < graph[start].length; i += 1) {
        // agregamos todas sus conexiones al queue
        queue.push(graph[start][i]);
      }
    }
    visited[start] = true;
    if(queue.length != 0) {
      return queue[0] === end || solveGraphBFS(graph, queue.shift(), end, visited, queue);
    } else {
      return false;
    }
}