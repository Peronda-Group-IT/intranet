'use server'

import { getSession } from "./session";

export async function postMetrics(props) {

    const METRICS_ENDPOINT = process.env.PERONDA_METRICS_URL
    const API_KEY = process.env.PERONDA_METRICS_API_KEY
    const ORIGIN = process.env.NEXT_PUBLIC_URL

    const {username} = await getSession();

    fetch(`${METRICS_ENDPOINT}/metrics`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
    },
    body: JSON.stringify({
      service: props.service,
      route: props.route,
      username: username,
      origin: ORIGIN,
    }),
  })
}
