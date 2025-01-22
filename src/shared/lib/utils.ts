import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
    return new Date(date).toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

export function formatPostDate(date: string | Date) {
    const now = new Date()
    const postDate = new Date(date)
    const diff = now.getTime() - postDate.getTime()
    
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    const weeks = Math.floor(days / 7)
    
    if (seconds < 60) {
        return `${seconds} секунд назад`
    }
    
    if (minutes < 60) {
        return `${minutes} ${formatMinutes(minutes)} назад`
    }
    
    if (hours < 24) {
        return `${hours} ${formatHours(hours)} назад`
    }
    
    if (days < 7) {
        return `${days} ${formatDays(days)} назад`
    }
    
    if (weeks < 4) {
        return `${weeks} ${formatWeeks(weeks)} назад`
    }
    
    return postDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    })
}

function formatMinutes(minutes: number): string {
    if (minutes >= 11 && minutes <= 14) return 'минут'
    const lastDigit = minutes % 10
    if (lastDigit === 1) return 'минуту'
    if (lastDigit >= 2 && lastDigit <= 4) return 'минуты'
    return 'минут'
}

function formatHours(hours: number): string {
    if (hours >= 11 && hours <= 14) return 'часов'
    const lastDigit = hours % 10
    if (lastDigit === 1) return 'час'
    if (lastDigit >= 2 && lastDigit <= 4) return 'часа'
    return 'часов'
}

function formatDays(days: number): string {
    if (days >= 11 && days <= 14) return 'дней'
    const lastDigit = days % 10
    if (lastDigit === 1) return 'день'
    if (lastDigit >= 2 && lastDigit <= 4) return 'дня'
    return 'дней'
}

function formatWeeks(weeks: number): string {
    if (weeks >= 11 && weeks <= 14) return 'недель'
    const lastDigit = weeks % 10
    if (lastDigit === 1) return 'неделю'
    if (lastDigit >= 2 && lastDigit <= 4) return 'недели'
    return 'недель'
}
