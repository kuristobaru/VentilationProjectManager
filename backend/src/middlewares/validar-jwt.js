import {response} from 'express';
import jwt from 'jsonwebtoken';


export const validarJWT = (req, res = response, next ) => {
    const token = req.header('Authorization');

    if (token) {
        try {
          const { uid } = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETORPRIVATEKEY);

          req.uid = uid;
  
          next();
        } catch (error) {
            return res.status(401).json({
                ok: false,
                msg: 'Token invalido',
            })
        }
    } else {
        return res.status(401).json({
            ok: false,
            msg: 'Token no proporcionado',
        })
    }
}
