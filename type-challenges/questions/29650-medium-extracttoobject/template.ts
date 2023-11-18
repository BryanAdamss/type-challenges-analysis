type ExtractToObject<T, P extends keyof T> = Omit<Omit<T, P> & T[P], never>
