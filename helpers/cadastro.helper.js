const cadastroDB = require('../db/cadastro.db')
const logger = require('../lib/logger')

module.exports = {
    async createEmpreendedor(cadastro) {
        return cadastroDB.createEmpreendedor(cadastro)
    },

    async getEmpreendedores(id) {
        return cadastroDB.getEmpreendedores(id)
    },

    async createEmpreendimento(empreendimento) {
        logger.debug(empreendimento)
        if (empreendimento.tipo === 'PF') {
            if (!empreendimento.empreendedorId) {
                return {
                    success: false,
                    message: 'Campo "empreendedorId" é obrigatório para empreendimento tipo PF'
                }
            }
            let missingFields = { razaoSocial: null, cnpj: null, dataFundacao: null, cnaesSecundarios: null }
            Object.assign(empreendimento, missingFields)

        } else if (empreendimento.tipo === 'PJ') {
            if (!empreendimento.razaoSocial || !empreendimento.cnpj || !empreendimento.dataFundacao) {
                return {
                    success: false,
                    message: 'Campos "razaoSocial", "cnpj" e "dataFundacao" são obrigatórios para empreendimento tipo PJ'
                }
            }
            if (!Array.isArray(empreendimento.empreendedores) || empreendimento.empreendedores.length === 0) {
                return {
                    success: false,
                    message: 'Campo "empreendedores" é obrigatório para empreendimento tipo PJ'
                }
            }
            let missingFields = { empreendedorId: null }
            Object.assign(empreendimento, missingFields)
        }
        let coordRegex = /^-?\d{1,3}\.\d+$/
        if (coordRegex.exec(empreendimento.latitude) && coordRegex.exec(empreendimento.longitude)) {
            empreendimento.localizacao = `SRID=4326;POINT(${empreendimento.longitude} ${empreendimento.latitude})`
        } else {
            return {
                success: false,
                message: 'Campos "latitude" e/ou "longitude" possuem formato inválido'
            }
        }
        let empreendimentoId = await cadastroDB.createEmpreendimento(empreendimento)
        logger.debug('EmpreendimentoId = %s', empreendimentoId)
        if (empreendimento.tipo === 'PJ') {
            let results = []
            empreendimento.empreendedores.forEach(empreendedorId => {
                results.push(cadastroDB.createEmpreendimentoEmpreendedor(empreendimentoId, empreendedorId))
            })
            try {
                await Promise.all(results)
            } catch (err) {
                logger.error(err)
                return {
                    success: false,
                    message: 'Erro ao cadastrar empreendedores. Registro parcialmente criado.'
                }
            }
        }
        return { success: true }
    },

    async getEmpreendimentos(id) {
        return cadastroDB.getEmpreendimentos(id)
    }
}
