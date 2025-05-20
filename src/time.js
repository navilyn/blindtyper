'use strict';

export function readableTimestamp() {
  const now = new Date();
  return now.toLocaleString('sv-SE').replace(/:\d{1,2}$/g, '') // sv-SE = "2025-04-24 18:33:15"
}

export function machineTimestamp(){
  return readableTimestamp()
    .replace(/:\d{1,2}$/g,'')
    .replace(/\ /, '-')
    .replace(/:/,'-')
}
