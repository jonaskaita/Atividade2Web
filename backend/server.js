import express from "express";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});

const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: ":memory:",
    logging: false,
});

const Pocao = sequelize.define("Pocao", {
    nome: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },

    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    },

    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

app.get("/", (req,res) => {
    res.send("Poções e Soluções")
});

app.get("/pocoes",  async (req, res) => {
    const pocoes = await Pocao.findAll();

    res.json(pocoes);
});

app.post("/pocoes", async (req, res) => {
    try {
        const { nome, descricao, imagem, preco } = req.body;

        const novaPocao = await Pocao.create({
            nome,
            descricao,
            imagem,
            preco
        });

        res.status(201).json(novaPocao);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.delete("/pocoes/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await Pocao.destroy({
            where: { id }
        });

        if (!deleted) {
            return res.status(404).json({ message: "Poção não encontrada" });
        }

        res.json({ message: "Poção deletada com sucesso" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.put("/pocoes/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, descricao, imagem, preco } = req.body;

        const pocao = await Pocao.findByPk(id);

        if (!pocao) {
            return res.status(404).json({ message: "Poção não encontrada" });
        }

        await pocao.update({
            nome,
            descricao,
            imagem,
            preco
        });

        res.json(pocao);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function start() {
    try {
        await sequelize.sync({force : true});

        await Pocao.bulkCreate([
            {
                nome: "Poção Blue Sky",
                descricao: "Essa poção provê um surto de inspiração por 24 horas. Foi utilizada por John Lennon quando escreveu Lucy in the Sky with Diamonds.",
                imagem: "https://i.ibb.co/ZzS7xb2/rsz-sky.png",
                preco: 300.00
            },
            {
                nome: "Poção do Perfume Misterioso",
                descricao: "Essa poção faz com que você fique cheirando lilás e groselha por 24 dias. Essência muito admirada pelos bruxos.",
                imagem: "https://i.ibb.co/pyhZJXf/rsz-lilas.png",
                preco: 200.00
            },
            {
                nome: "Poção de Pinus",
                descricao: "Essa poção faz com que você fique 10 cm mais alto! Observação: efeitos colaterais desconhecidos.",
                imagem: "https://i.ibb.co/DkzdL1q/rsz-pinus.png",
                preco: 3000.00
            },
            {
                nome: "Poção da Beleza Eterna",
                descricao: "Veneno que mata rápido.",
                imagem: "https://i.ibb.co/9p872NK/rsz-1beleza.png",
                preco: 100.00
            },

            {
                nome:"Poção do Arco Íro",
                descricao:"Traz felicidade momentânea. Pode durar de 10 minutos a 2 dias",
                imagem:"https://i.ibb.co/PrC09MP/rsz-2unicornio.png",
                preco:120.00
            },

            {
                nome:"Caldeirão das Verdades Secretas",
                descricao:"As pessoas lhe dirão apenas verdades por 1 hora. É necessário beber os 5L.",
                imagem:"https://i.ibb.co/s9Lyvj8/rsz-verdades.png",
                preco:150.00
            }
        ]);

        app.listen(3000, () => {
            console.log("Servidor rodando em http://localhost:3000");
        });

    } catch (err) {
        console.error("Erro ao iniciar servidor:", err);
    }
}

start();