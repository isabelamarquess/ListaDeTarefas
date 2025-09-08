const adiciona = document.querySelector('.inputNovaTarefa');
const botao = document.querySelector('.btnAddTarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li'); //Cria a tag li
    return li;
}

adiciona.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        if (!adiciona.value) return;
        criaTarefa(adiciona.value);
    }
});

function limpaInput() {
    adiciona.value = '';
    adiciona.focus();
}

function criaBotaoApagar(li) {
  li.innerHTML += ' ';
  const botaoApagar = document.createElement('button');
  botaoApagar.innerText = 'Feito';
  //botaoApagar.classList.add('apagar') ou
  botaoApagar.setAttribute('class', 'apagar'); //assim pois serve para qualquer outro atributo
  botaoApagar.setAttribute('title', 'Apagar esta tarefa');
  li.appendChild(botaoApagar);  
}

function criaTarefa(textoInput) {
   const li = criaLi();
   li.textContent = textoInput;
   tarefas.appendChild(li)
   limpaInput();
   criaBotaoApagar(li)
   salvarTarefas();

}

botao.addEventListener('click', function() {
    if(adiciona.value === '') {
        alert("Por favor, insira alguma tarefa")
    }else{
        criaTarefa(adiciona.value);
    }
    
});

document.addEventListener('click', function(e) {
        const el = e.target;
        if(el.classList.contains('apagar')) {
            el.parentElement.remove(); //para apagar o pai da tag
            salvarTarefas();//para apagar do navegador tbm
        }

    });

function salvarTarefas() {
    //ver quantos lis tem lá dentro e pegar eles dentro das tarefas
    const liTarefas = tarefas.querySelectorAll('li');
    //vou criar um array para mostrar todas as li
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Feito', '').trim() //trim para remover um espacinho;
        console.log(tarefaTexto);
        listaDeTarefas.push(tarefaTexto);
        
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas); // para conseguir salvar no navegador
    localStorage.setItem('tarefas', tarefasJSON); //aqui só pode salvar para string, por isso foi convertido em json para string
    
}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas); //convertendo as tarefas de volta para um array

    for(let tarefa of listaDeTarefas) {
        criaTarefa(tarefa);
    }
    
}
adicionaTarefasSalvas()