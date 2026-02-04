export interface RasaButton {
  title: string;
  payload: string;
}

export interface RasaMessage {
  recipient_id: string;
  text?: string;
  buttons?: RasaButton[];
}

const RASA_REST_URL = "http://150.241.244.100:5005/webhooks/rest/webhook";

export async function sendRasaMessage(
  sender: string,
  message: string
): Promise<RasaMessage[]> {
  const res = await fetch(RASA_REST_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender,
      message,
    }),
  });

  if (!res.ok) {
    throw new Error(`Rasa REST error: ${res.status}`);
  }

  return res.json();
}
