**Padronização de código Front-End de implantação.**

**RESUMO DA PROPOSTA:**

Este documento tem como objetivo apresentar uma visão geral das ações proposta pela equipe de Front-End do setor de implantação para unificar o processo de trabalho e explicar os pontos que estão sendo discutidos em reunião para melhorar todo fluxo de trabalho tanto de implantação de novas lojas quanto de suporte.

A padronização do código tem como objetivo capacitar os colaboradores a trabalhar em conjunto tornando mais fácil a comunicação da equipe, agilidade de trabalho, inclusão e compartilhamento de soluções rápidas para projetos futuros.

SASS:

Como proposta principal temos a reformulação total do SASS no modelo que foi aprovada pela equipe, esta reformulação será responsável por toda mudança e aperfeiçoamento do trabalho como todo. A proposta consiste em separar o trabalho em 3 categorias, **DESENVOLVIMENTO**, **DECLARAÇÃO **e **PRODUÇÃO**:

![image alt text](image_0.jpg)

**DESENVOLVIMENTO:**

Cada bloco ou página terá sua responsabilidade total e isolada, isso facilita na hora de resolver determinado problema ou para a criação de um novo componente, a proposta dessa parte do trabalho é que o colaborador consiga resolver todo componente sem sair do arquivo, inclusive desenvolver o módulo responsivo deste componente dentro do mesmo contexto se assim desejar, cada componente possui três separações (global, desktop e mobile):


Essa separação é responsável por garantir que o desenvolvimento estrutural de cada versão da loja não interfira em suas versões desktop e mobile já a versão global do componente é replicado para ambos ambientes, assim garantindo a identidade dos componentes e diminuindo possíveis erros de diferenças na loja.

Exemplo:

<table>
  <tr>
    <td>
	// COMPONENTE
	//----------------------------------------------------------

	%componente-global{
	    //atribuições que serão replicadas para versão Desktop e Mobile da loja
	}

	%componente-desktop{
	    //atribuições exclusivas da versão desktop da loja.
	}

	%componente-mobile{
	    //atribuições exclusivas da versão mobile da loja.
	}
   </td>
  </tr>
</table>


**DECLARAÇÃO:**

A declaração dos componentes é responsável por definir os locais onde cada componente deve aparecer e também definir o seu nível de especificidade em relação ao código da master, nesta seção só é permitida a inclusão de classes e estruturas de acesso e a inclusão (extend) dos componentes criados na seção de desenvolvimento, nesta seção não é permitida a inclusão de atributos (padding, margin, color, float etc…) e também será alterada com menor frequência uma vez que estiver pronta.

<table>
  <tr>
    <td>
	// HOME - DESKTOP
	//----------------------------------------------------------

	body{
	    #header{
		@extend %header-global;
		@extend %header-desktop;
	    }
	    .footer{
		@extend %footer-global;
		@extend %footer-desktop;   
	    }
	}
   </td>
  </tr>
</table>


<table>
  <tr>
    <td>
	// HOME - MOBILE
	//----------------------------------------------------------

	body{
	    #header{
		@extend %header-global;
		@extend %header-mobile;
	    }
	    .footer{
		@extend %footer-global;
		@extend %footer-mobile;   
	    }
	}
   </td>
  </tr>
</table>


**PRODUÇÃO:**

A última parte do projeto é a criação dos arquivos CSS minificados para serem inclusos na loja, a novidade nesta categoria é somar toda parte modular do projeto, GIT e Grunt para criar um procedimento que nos permita trabalhar de forma simultânea em um mesmo projeto que será explicado a seguir.

DESENVOLVIMENTO E MANUTENÇÃO SIMULTÂNEA:

Com a reformulação do SASS também temos como objetivo separar toda loja em componentes e gerar todo CSS de forma independente, ou seja, cada componente ou bloco da loja terá seu próprio CSS final. Isso possibilita que dois ou mais colaboradores consigam trabalhar focado cada um em um componente, todos iram gerar seu próprio CSS e a loja será atualizada modularmente.

Este procedimento requer uma série de ações para que se consiga chegar no objetivo que é o trabalho simultâneo:

1. **Separação de componentes**

Será necessária a análise completa da loja para que a equipe tenha uma visão geral do projeto e assim conseguir "quebrar" todo projeto em partes, inclusive páginas mais complexas como Detalhe do Produto e Detalhe do Look deste modo tornar possível que mais de uma pessoa trabalhe inclusive no desenvolvimento da mesma página:

![image alt text](image_1.jpg)

2. **SASS**

Uma vez que a equipe tenha conhecimento de todos os componentes da loja iremos criar um arquivo base de desenvolvimento para cada componente, deste modo iremos garantir que cada parte do projeto será tratado de forma independente, seja ele um componente isolado ou parte de uma página:

3. **GRUNT**

Nesta etapa iremos configurar um pré-processador para automatizar o trabalho de gerar os arquivos finais, diferente de como funciona hoje este pré processador irá compilar apenas o componente em desenvolvimento, isso irá gerar um css para cada componente e sua velocidade de compilação será muito mais rápida.

4. **GIT**

Quando o trabalho simultâneo for necessário iremos utilizar o GIT para criar uma Branch para cada feature que será desenvolvida, como no passo 1 e 2 já criamos os componentes de forma independente e já temos conhecimento dos componentes da loja podemos trabalhar de forma isolada em cada componente:

![image alt text](image_2.jpg)	

5. **CSS**

Tendo o CSS final desmembrado conseguimos focar os trabalhos em cada componente, um componente ao ser salvo será gerado um CSS específico dele que por fim será incluso no arquivo CSS da loja:

![image alt text](image_3.jpg)




*CORE ÚNICO DA EQUIPE:*

Com uma proposta de criar algo que seja de conhecimento geral da equipe também será gerado uma seção dentro do SASS para inclusão de novos itens ou novos componentes, nele será necessário informar para qual finalidade ele serve e onde foi aplicado (para conferência visual), isso irá atualizar o nosso core único para que os próximos projetos tenham suporte total a tudo que criamos.

*SEM CÓDIGO DESNECESSÁRIO:*

Seguindo a ideia de separar o desenvolvimento da declaração dos componentes teremos total controle do código que será compilado no final do desenvolvimento, isso nos permite separar nossa biblioteca de componentes do que será compilado.

*RE-ESTRUTURAÇÃO DAS PÁGINAS INSTITUCIONAIS:*

Junto com toda análise de implantação das lojas também gostaríamos de re-estruturar todas as páginas institucionais de nossas lojas para que seus layouts se tornem mais atraentes de forma geral e que sua aplicação de layout seja prevista para a versão responsiva.

Caso fosse possível poderíamos contar com a ajuda do setor de Layout para criar as telas (padrões) de forma que elas atendam todos nossos clientes de forma geral e assim teríamos um template melhorado dessas telas que normalmente não possuem layout aprovado pelo cliente.

*HOMOLOGAÇÃO (MANTIS):*

Focando nas melhorias que nosso projeto poderá impactar positivamente nos erros são:

* Quanto maior a biblioteca do nosso core mais rápida será a inclusão de correções nas lojas, acreditamos que um código único tem maior poder de reutilização.

* Neste contexto de mais pessoas conseguirem trabalhar no mesmo projeto, também será possível mais de uma pessoa trabalhar na resolução de problemas da mesma loja.

* Tendo todas as telas institucionais reformuladas podemos torná-las padrões em suas versões desktop e mobile assim prevendo possíveis erros repetitivos.

* Nosso time está comprometido em reunir todos os chamados que acreditamos não ser relacionado a layout e também sempre analisar os mais recorrentes para criar soluções no core para reduzir a recorrência, uma vez com o projeto concluído nossas reuniões serão para melhorar essas questões.

**Manual de desenvolvimento SASS.**
	

* Nome dos placeholders

* Regra de prefixo g_, d_ e m_

* Extend em duplas

* id #remover_este_bloco

* Preciso criar um arquivo novo, como fazer?

* Preciso adicionar um componente a um arquivo existente, como fazer?

