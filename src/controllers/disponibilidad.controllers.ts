import { Request, Response } from "express";
import { catchError } from "../utils/catchError";
import Disponibilidad from "../models/Disponibilidad";
import Cita from "../models/Cita";
import mongoose from "mongoose";
import { google } from "googleapis";
import ProfessionModel from "../models/professionals";
import User from "../models/User";
import ClientModel from "../models/Client";
import oAuth2Client from "../utils/oAuth2Client";
// import axios from 'axios';

//Get all
export const getAll = catchError(
  async (_req: Request, res: Response): Promise<void> => {
    const disponibilidad = await Disponibilidad.find();

    res.json(disponibilidad);
  }
);

//Get one --------
export const getOne = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ message: "ID invalid" });
  } else {
    const disponibilidad = await Disponibilidad.findById(id);
    res.json(disponibilidad);
  }
});

//Post create
interface ICreate {
  dia: string;
  horas: string[];
  profesional: string;
}

export const create = catchError(async (req: Request, res: Response) => {
  const { dia, horas, profesional }: ICreate = req.body;
  const prof = await Disponibilidad.find({ profesional });

  const newBody = {
    disponibilidad: [
      {
        dia,
        horas,
      },
    ],
    profesional,
  };

  if (prof.length === 0) {
    const disponibilidad = new Disponibilidad(newBody);
    await disponibilidad.save();

    if (!disponibilidad) {
      res.sendStatus(404);
    } else {
      res.status(201).json(disponibilidad);
    }
  } else {
    res.json({
      status: false,
      msg: "la disponibilidad del profesional ya existe, agrege nueva fecha",
    });
    //     const disponibilidades = await Disponibilidad.find()
    //     const inde = disponibilidades.findIndex(i => i.profesional.toString() === profesional)
  }
});

//Put addNewHour -->
interface IAvailability {
  Hour: string[];
}

export const addHour = catchError(async (req: Request, res: Response) => {
  const { id, idDate } = req.params;

  try {
    const { Hour }: IAvailability = req.body;
    const elementMatch = {
      profesional: id,
      disponibilidad: { $elemMatch: { _id: idDate } },
    };
    const disponibilidad = await Disponibilidad.findOne(elementMatch);

    if (disponibilidad) {
      const isDispo = disponibilidad.disponibilidad.findIndex(
        (dispo) => dispo._id.toString() === idDate
      );

      let hour: string[] = disponibilidad.disponibilidad[isDispo].horas;

      Hour.forEach((hHoras) => {
        if (hour.indexOf(hHoras) < 0) {
          hour.push(hHoras);
        }
      });

      disponibilidad.disponibilidad[isDispo].horas = hour;
      await disponibilidad.save();

      res.json(disponibilidad);
    } else {
      res.status(404).json({ message: "Disponibilidad no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

//update hour
interface IUpdateHour {
  cHour: string;
  nHour: string;
}

export const updateHour = catchError(async (req: Request, res: Response) => {
  try {
    const { id, idDate } = req.params;
    const elementMatch = {
      profesional: id,
      disponibilidad: { $elemMatch: { _id: idDate } },
    };

    const { cHour, nHour }: IUpdateHour = req.body;

    const disponibilidad = await Disponibilidad.findOne(elementMatch);

    if (disponibilidad) {
      const isDispo = disponibilidad.disponibilidad.findIndex(
        (dispo) => dispo._id.toString() === idDate
      );

      const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(cHour);

      if (index >= 0) {
        disponibilidad.disponibilidad[isDispo].horas.splice(index, 1, nHour);
        await disponibilidad.save();

        res.json(disponibilidad);
      } else {
        res
          .status(404)
          .json({ error: "La hora no existe en la disponibilidad" });
      }
    } else {
      res
        .status(404)
        .json({ error: "profesional o disponibilidad no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

interface IDeleteHour {
  Hour: string;
}
export const deleteHour = catchError(async (req: Request, res: Response) => {
  try {
    const { id, idDate } = req.params;
    const elementMatch = {
      profesional: id,
      disponibilidad: { $elemMatch: { _id: idDate } },
    };

    const { Hour }: IDeleteHour = req.body;

    const disponibilidad = await Disponibilidad.findOne(elementMatch);

    if (disponibilidad) {
      const isDispo = disponibilidad.disponibilidad.findIndex(
        (dispo) => dispo._id.toString() === idDate
      );

      const index = disponibilidad.disponibilidad[isDispo].horas.indexOf(Hour);

      if (index >= 0) {
        disponibilidad.disponibilidad[isDispo].horas.splice(index, 1);
        await disponibilidad.save();

        res.json(disponibilidad);
      } else {
        res
          .status(404)
          .json({ error: "La hora no existe en la disponibilidad" });
      }
    } else {
      res
        .status(404)
        .json({ error: "profesional o disponibilidad no encontrada" });
    }
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

interface ICreateNewAvailability {
  date: string;
  hours: string[];
}

export const createNewAvailability = catchError(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const { date, hours }: ICreateNewAvailability = req.body;

      const newBody = { dia: date, horas: hours };

      const newDisponibilidad = await Disponibilidad.findOneAndUpdate(
        { profesional: id },
        { $push: { disponibilidad: newBody } },
        { new: true }
      );

      if (newDisponibilidad) {
        res.json(newDisponibilidad);
      } else {
        res.status(404).json({ error: "Disponibilidad no encontrada" });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

interface ICreateCita {
  hour: string;
  comments: string;
  client: string;
  code: string;
}

export const createCita = catchError(async (req: Request, res: Response) => {
  try {
    const { id, idDate } = req.params;
    const elementMatch = {
      profesional: id,
      disponibilidad: { $elemMatch: { _id: idDate } },
    };

    const {
      hour,
      comments,
      client,
      code
    }: ICreateCita = req.body;

    const disponibilidad = await Disponibilidad.findOne(elementMatch);
    const profesional = await ProfessionModel.findById(id);
    const userprofesional = await User.findById(profesional?.user);
    const correoProfesional: any = userprofesional?.Email;
    // console.log(userprofesional?.Email);

    const cliente = await ClientModel.findById(client);
    const userCliente = await User.findById(cliente?.user);

    const correoCliente: any = userCliente?.Email;
    // console.log(cliente);
    if (!code) {
      res
        .status(400)
        .json({ error: "Faltan campos requeridos en los parámetros." });
    } else {
      if (disponibilidad) {
        let isDispo: number = disponibilidad.disponibilidad.findIndex(
          (dispo) => dispo._id.toString() === idDate
        );
        let isHour: number =
          disponibilidad.disponibilidad[isDispo].horas.indexOf(hour);

        if (isHour >= 0) {
          const date: string = disponibilidad.disponibilidad[isDispo].dia;

          const newBody = {
            date,
            hour: hour,
            comments,
            client,
            professional: id,
          };

          const cita = new Cita(newBody);
          await cita.save();

          if (cita) {
            disponibilidad.disponibilidad[isDispo].horas.splice(isHour, 1);
            await disponibilidad.save();
           
            const auth = await getAuthClient(code);
            await createGoogleEvent(
              auth,
              date,
              hour,
              comments,
              correoCliente,
              correoProfesional
            );

            res.json(cita);
          } else {
            res.status(404).json({ error: "Error al agendar la cita" });
          }
        } else {
          res
            .status(404)
            .json({ error: "La hora no existe en la disponibilidad" });
        }
      } else {
        res
          .status(404)
          .json({ error: "El profesional o la disponibilada no existe" });
      }
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Remove One -->
export const remove = catchError(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ message: "ID invalid" });
  } else {
    const disponibilidad = await Disponibilidad.deleteOne({ _id: id });

    if (disponibilidad.deletedCount == 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  }
});

export const deleteAvailability = catchError(
  async (req: Request, res: Response) => {
    try {
      const { id, idDate } = req.params;
      const elementMatch = {
        profesional: id,
        disponibilidad: { $elemMatch: { _id: idDate } },
      };
      const disponibilidad = await Disponibilidad.findOne(elementMatch);

      if (disponibilidad) {
        const index: number = disponibilidad.disponibilidad.findIndex(
          (dispo) => dispo._id.toString() === idDate
        );
        disponibilidad.disponibilidad.splice(index, 1);
        await disponibilidad.save();

        res.json(disponibilidad);
      } else {
        res
          .json(404)
          .json({ error: "Profesional o disponibilidad no encontrada" });
      }
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
);

export const obtenerDisponibilidadProfesional = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { idprofesional } = req.params;

  if (!idprofesional.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(404).json({
      status: false,
      msg: "not found profesional",
    });
  }

  const disponibilidad = await Disponibilidad.findOne({
    profesional: idprofesional,
  });

  return res.json(disponibilidad);
};

async function getAuthClient(code: string) {
 
  const { tokens } = await oAuth2Client.getToken(code);
    oAuth2Client.setCredentials(tokens);

  try {
    oAuth2Client.setCredentials(tokens);
    return oAuth2Client;
  } catch (error) {
    throw new Error(
      "No se pudo obtener el token de acceso. Por favor, autoriza la aplicación."
    );
  }
}

async function createGoogleEvent(
  auth: any,
  date: string,
  hour: string,
  comments: string,
  clientEmail: string,
  professionalEmail: string
) {
  const calendar = google.calendar({ version: "v3", auth });

  const event = {
    summary: "Cita de ZonnaRunning",
    location: "Google Meet", // Puedes cambiar esto por la ubicación de tu reunión en línea
    description: comments,
    start: {
      dateTime: `${date}T${hour}:00`,
      timeZone: "UTC-5", // Cambia esto por la zona horaria adecuada
    },
    end: {
      dateTime: `${date}T${hour}:30`,
      timeZone: "UTC-5", // Cambia esto por la zona horaria adecuada
    },
    attendees: [{ email: clientEmail }, { email: professionalEmail }],
    conferenceData: {
      createRequest: {
        requestId: "random-id",
        conferenceSolutionKey: {
          type: "hangoutsMeet",
        },
      },
    },
  };

  try {
    await calendar.events.insert({
      auth: auth,
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });
  } catch (error) {
    console.log(error);
  }
}

export const authUrl = catchError(async (req: Request, res: Response) => {
  const scopes = ["https://www.googleapis.com/auth/calendar"];

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
  });
  res.redirect(authorizeUrl);
});

export const getToken = catchError(async (req: Request, res: Response) => {
  const code = req.query.code as string;

  try {
    res.json({ code});
  } catch (err) {
    console.error("Error al obtener el token:", err);
    res.status(500).json({ error: "Error al obtener el token" });
  }
});
