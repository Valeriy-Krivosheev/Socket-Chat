export default function useTime() {
  const localDateWithoutMs = (dateNow: number) => {
    return new Date(dateNow).toLocaleString('ru-RU', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return { localDateWithoutMs }
}
