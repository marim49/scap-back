const pool = require('../lib/pool')

module.exports = {

    async createEmpreendedor(empreendedor) {
        let query = `
            INSERT INTO empreendedor(usuario_id, tipo, nome, documento, nascimento, rg, estado_rg, cep, logradouro,
                                     numero, complemento, bairro, cidade, estado, email, tel_principal, tel_alternativo)
            VALUES($usuarioId, $tipo, $nome, $documento, $nascimento, $rg, $estadoRG, $cep, $logradouro,
                   $numero, $complemento, $bairro, $cidade, $estado, $email, $telPrincipal, $telAlternativo)
        `
        await pool.query(query, empreendedor)
    },

    async getEmpreendedores(id) {
        let query = `
            SELECT id, tipo, nome, cidade
            FROM empreendedor
            WHERE id = $id
        `
        let parameters = {id}
        let results = await pool.query(query, parameters)
        return results.rows
    },

    async createEmpreendimento(empreendimento) {
        let query = `
            INSERT INTO empreendimento (usuario_id, tipo, empreendedor_id, razao_social, cnpj, data_fundacao,
                                        cnae_primario, cnaes_secundarios, localizacao, cep, logradouro, numero,
                                        complemento, bairro, cidade, estado)
            VALUES ($usuarioId, $tipo, $empreendedorId, $razaoSocial, $cnpj, $dataFundacao,
                    $cnaePrimario, $cnaesSecundarios, $localizacao, $cep, $logradouro, $numero,
                    $complemento, $bairro, $cidade, $estado)
            RETURNING id
        `
        let result = await pool.query(query, empreendimento)
        return result.rows[0].id
    },

    async createEmpreendimentoEmpreendedor(empreendimentoId, empreendedorId) {
        let query = `
            INSERT INTO empreendimento_tem_empreendedor (empreendimento_id, empreendedor_id)
            VALUES ($empreendimentoId, $empreendedorId)
        `
        let parameters = { empreendimentoId, empreendedorId }
        await pool.query(query, parameters)
    },

    async getEmpreendimentos(id) {
        let query = `
            SELECT id, tipo, documento, nome
            FROM v_empreendimento 
            WHERE id = $id
        `
        let parameters = {id}
        let results = await pool.query(query, parameters)
        return results.rows
    },
}
