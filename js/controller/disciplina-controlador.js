class DisciplinaControlador {
    constructor() {
        this.disciplinaServico = new DisciplinaServico();
    }

    inserir() {
        const codigoDisciplina = Number(document.querySelector("#codigoD").value);
        const nomeDisciplina = document.querySelector("#nomeD").value;
        const disciplina = this.disciplinaServico.inserir(codigoDisciplina, nomeDisciplina);
        console.log(disciplina);
        if (disciplina) {
            this.mostrarDisciplinaNoHTML(codigoDisciplina, nomeDisciplina);
            alert('Disciplina inserida com sucesso!');
        } else {
            alert('Disciplina já existente');
        }
    }

    mostrarDisciplinaNoHTML(nome, codigo) {
        const elementoP = document.createElement("p");
        elementoP.textContent = `${codigo} - ${nome}`;

        const elementoBotaoApagar = document.createElement("button");
        elementoBotaoApagar.textContent = "X";

        elementoBotaoApagar.addEventListener('click', (event) => {
                this.removerDisciplinaDaLista(codigo);
                event.target.parentElement.remove();
            }
        );
        elementoP.appendChild(elementoBotaoApagar);
        document.querySelector('#disciplina').appendChild(elementoP);
    }

    removerDisciplinaDaLista(codigo) {
        this.disciplinaServico.remover(codigo);
    }

    inserirAlunoNaDisciplina() {
        const codigoDisciplina = Number(document.querySelector("#codigoExistente").value);
        const nomeAluno = document.querySelector("#nomeExistente").value;
        const disciplina = this.disciplinaServico.buscarPorCodigo(codigoDisciplina);
        if (disciplina) {
            const aluno = new Aluno(nomeAluno);
            this.disciplinaServico.inserirAlunoNaDisciplina(codigoDisciplina, aluno);
            this.mostrarAlunoDisciplinaNoHTML(codigoDisciplina, nomeAluno);
            alert('Aluno adicionado na disciplina!');
        } else {
            alert('Disciplina não localizada, tente novamente!');
        }
    }

    removerAlunoDaDisciplina(codigo, nome) {
        const disciplina = this.disciplinaServico.buscarPorCodigo(codigo);
        const aluno = new Aluno(nome);
        this.disciplinaServico.removerAlunoDaDisciplina(disciplina, aluno);
    }

    mostrarAlunoDisciplinaNoHTML(codigo, nome) {
        const elementoP = document.createElement("p");
        elementoP.textContent = `${codigo} - ${nome}`;

        const elementoBotaoApagar = document.createElement("button");
        elementoBotaoApagar.textContent = "X";

        elementoBotaoApagar.addEventListener('click', (event) => {
                this.removerAlunoDaDisciplina(event.target.parentElement.getAttribute("data-codigo"), nome);
                event.target.parentElement.remove();
            }
        );
        elementoP.appendChild(elementoBotaoApagar);
        elementoP.setAttribute("data-codigo", codigo);
        document.querySelector('#AlunoDisciplina').appendChild(elementoP);
    }
       

}