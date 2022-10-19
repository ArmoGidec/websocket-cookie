const appEl = document.querySelector('#app');

const urlSettings = {
  local: {
    protocol: {
      http: 'http',
      ws: 'ws',
    },
    url: 'localhost:8080',
  },
  remote: {
    protocol: {
      http: 'https',
      ws: 'wss',
    },
    url: 'f2dc-37-252-83-91.ngrok.io',
  },
};

const type = 'remote';
const settings = urlSettings[type];

await fetch(`${settings.protocol.http}://${settings.url}/`, {
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  method: 'POST',
  body: JSON.stringify({
    name: 'token',
    value: '12345',
  }),
  credentials: 'include'
});

const ws = new WebSocket(`${settings.protocol.ws}://${settings.url}/connect`, ['token', 'test']);

const createSpan = (content = '') => {
  const span = document.createElement('span');
  span.innerHTML = content;
  return span
};

ws.addEventListener('message', (ev) => {
  appEl.append(
    createSpan(ev.data),
  );
});

ws.addEventListener('error', (error) => {
  console.log(error);
});
