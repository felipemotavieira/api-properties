declare global {
    namespace NodeJS{
        interface ProcessEnv {
            PGPORT: number | undefined
            PORT:  number 
        }
    }
}

export {}