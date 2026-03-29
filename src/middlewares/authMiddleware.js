const fetch = require("node-fetch");

/**
 * authMiddleware
 *
 * *** PONTO-CHAVE DO MICROSERVICE ***
 * Em vez de verificar o JWT localmente, este serviço faz uma requisição
 * HTTP para o Auth Service (porta 3000) e pergunta: "esse token é válido?"
 *
 * Isso garante que os dois serviços sejam independentes — o Posts Service
 * não precisa conhecer o segredo JWT, só precisa confiar no Auth Service.
 */
async function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
        // Chama o endpoint /dashboard do Auth Service para validar o token
        const response = await fetch(`${process.env.AUTH_SERVICE_URL}/dashboard`, {
            headers: { Authorization: authHeader }
        });

        if (!response.ok) {
            return res.status(401).json({ message: "Token inválido ou expirado" });
        }

        const data = await response.json();

        // Injeta os dados do usuário autenticado na requisição
        req.user = data.user;
        next();

    } catch (err) {
        console.error("Erro ao contactar Auth Service:", err.message);
        return res.status(503).json({ message: "Auth Service indisponível" });
    }
}

module.exports = { authMiddleware };
