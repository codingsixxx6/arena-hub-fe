export function formatCurrency(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatDate(value: string) {
  return new Date(value).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

export function formatCompactNumber(value: number) {
  if (value >= 1_000_000) {
    return `${value / 1_000_000} jt`;
  }

  if (value >= 1_000) {
    return `${value / 1_000} rb`;
  }

  return value.toString();
}

export function formatElapsedTime(value: string) {
  const difference = Date.now() - new Date(value).getTime();

  const minutes = Math.floor(difference / 1000 / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days}d`;
  }

  if (hours > 0) {
    return `${hours}h`;
  }

  if (minutes > 0) {
    return `${minutes}m`;
  }

  return "<1m";
}

export function formatTime(value: string) {
  return new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "Asia/Jakarta",
  }).format(new Date(value));
}

export function formatOperatingTime(value: string){
  return value.slice(11, 16)
}