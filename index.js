const clinica = [];
let estado = "menu";
let nome_paciente, nome_medico, data_consulta, hora_consulta, nome_atualizar;

console.log(
  "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
);

process.stdin.on("data", function (data) {
  let input = data.toString().trim();

  if (estado === "menu") {
    if (input === "1") {
      estado = "adicionar_nome";
      console.log("Digite o nome do Paciente:");
    } else if (input === "2") {
      estado = "cancelar_consulta";
      console.log("Digite o nome do paciente que deseja cancelar:");
    } else if (input === "3") {
      if (clinica.length === 0) {
        console.log("Nenhuma consulta agendada.");
      } else {
        console.log("Consultas agendadas:");
        for (let paciente of clinica) {
          console.log(
            `Nome Paciente: ${paciente.nome_paciente}, Nome Medico: ${paciente.nome_medico}, Data Consulta: ${paciente.data_consulta}, Hora Consulta: ${paciente.hora_consulta}`
          );
        }
      }
      console.log(
        "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
      );
    } else if (input === "4") {
      estado = "atualizar_nome";
      console.log("Consultas agendadas:");
      for (let paciente of clinica) {
        console.log(
          `Nome Paciente: ${paciente.nome_paciente}, Nome Medico: ${paciente.nome_medico}, Data Consulta: ${paciente.data_consulta}, Hora Consulta: ${paciente.hora_consulta}`
        );
      }
      console.log("Digite o nome do paciente que deseja atualizar:");
    } else if (input === "5") {
      console.log("Saindo...");
      process.exit();
    } else {
      console.log("Opção inválida. Tente novamente.");
    }
  } else if (estado === "adicionar_nome") {
    nome_paciente = input;
    estado = "adicionar_medico";
    console.log("Digite o nome do médico:");
  } else if (estado === "adicionar_medico") {
    nome_medico = input;
    estado = "adicionar_data";
    console.log("Digite a data da consulta:");
  } else if (estado === "adicionar_data") {
    data_consulta = input;
    estado = "adicionar_hora";
    console.log("Digite a hora da consulta:");
  } else if (estado === "adicionar_hora") {
    hora_consulta = input;
    clinica.push({
      nome_paciente: nome_paciente,
      nome_medico: nome_medico,
      data_consulta: data_consulta,
      hora_consulta: hora_consulta,
    });
    console.log("Consulta agendada com sucesso!");
    estado = "menu";
    console.log(
      "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
    );
  } else if (estado === "cancelar_consulta") {
    let nomeCancelar = input;
    let cancelado = false;
    for (let i = 0; i < clinica.length; i++) {
      if (
        clinica[i].nome_paciente.toLowerCase() === nomeCancelar.toLowerCase()
      ) {
        clinica.splice(i, 1);
        console.log("Consulta cancelada com sucesso!");
        cancelado = true;
        break;
      }
    }
    if (!cancelado) {
      console.log("Consulta não encontrada!");
    }
    estado = "menu";
    console.log(
      "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
    );
  } else if (estado === "atualizar_nome") {
    nome_atualizar = input;
    let consulta = clinica.find(
      (paciente) =>
        paciente.nome_paciente.toLowerCase() === nome_atualizar.toLowerCase()
    );

    if (consulta) {
      console.log("Consulta encontrada:");
      console.log(
        `Nome Paciente: ${consulta.nome_paciente}, Nome Medico: ${consulta.nome_medico}, Data Consulta: ${consulta.data_consulta}, Hora Consulta: ${consulta.hora_consulta}`
      );
      estado = "atualizar_medico";
      console.log(
        "Digite o novo nome do médico (ou pressione Enter para manter o atual):"
      );
    } else {
      console.log("Consulta não encontrada!");
      estado = "menu";
      console.log(
        "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
      );
    }
  } else if (estado === "atualizar_medico") {
    nome_medico =
      input ||
      clinica.find(
        (paciente) =>
          paciente.nome_paciente.toLowerCase() === nome_atualizar.toLowerCase()
      ).nome_medico;
    estado = "atualizar_data";
    console.log(
      "Digite a nova data da consulta (ou pressione Enter para manter a atual):"
    );
  } else if (estado === "atualizar_data") {
    data_consulta =
      input ||
      clinica.find(
        (paciente) =>
          paciente.nome_paciente.toLowerCase() === nome_atualizar.toLowerCase()
      ).data_consulta;
    estado = "atualizar_hora";
    console.log(
      "Digite a nova hora da consulta (ou pressione Enter para manter a atual):"
    );
  } else if (estado === "atualizar_hora") {
    hora_consulta =
      input ||
      clinica.find(
        (paciente) =>
          paciente.nome_paciente.toLowerCase() === nome_atualizar.toLowerCase()
      ).hora_consulta;

    for (let i = 0; i < clinica.length; i++) {
      if (
        clinica[i].nome_paciente.toLowerCase() === nome_atualizar.toLowerCase()
      ) {
        clinica[i].nome_medico = nome_medico;
        clinica[i].data_consulta = data_consulta;
        clinica[i].hora_consulta = hora_consulta;
        break;
      }
    }

    console.log("Consulta atualizada com sucesso!");
    estado = "menu";
    console.log(
      "Escolha uma opção:\n1. Adicionar uma nova consulta\n2. Cancelar uma consulta\n3. Listar consultas\n4. Atualizar consulta\n5. Sair"
    );
  }
});
