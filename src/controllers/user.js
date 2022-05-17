const { user, profile, product } = require('../../models')

exports.addUsers = async (req, res) => {
    try {
        await user.create(req.body)

        res.send({
            status: 'success',
            message: 'Add user success'
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: 'failed',
            message: 'Server Error'
        })
    }
}

exports.getUsers = async (req, res) => {
    try {
        const data = await user.findAll({
            include: [
                {
                    model: profile,
                    as: "profile",
                    attributes: {
                        exclude: ["idUser", "createdAt", "updatedAt"],
                    },
                },
                {
                    model: product,
                    as: "products",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    },
                },
            ],
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            },
        });

        res.send({
            status: "success",
            data: {
                user: data,
            },
        });
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.getUser = async (req, res) => {
    try {
        const { id } = req.params;

        const data = await user.findAll({
            where: {
                id,
            },
            include: {
                model: profile,
                as: "profile",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idUser"],
                },
            },
            attributes: {
                exclude: ["password", "createdAt", "updatedAt"],
            }
        })

        res.send({
            status: "success",
            data: {
                user: data,
            }
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.update(req.body, {
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Update user id: ${id} success`,
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params

        await user.destroy({
            where: {
                id
            }
        })

        res.send({
            status: 'success',
            message: `Delete user id: ${id} success`
        })
    } catch (error) {
        console.log(error);
        res.send({
            status: "failed",
            message: "Server Error",
        });
    }
}