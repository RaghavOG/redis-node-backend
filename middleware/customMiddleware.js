import chalk from 'chalk';

const requestLogger = (req, res, next) => {
   const timeStamp = new Date().toISOString();
   const method = req.method;
   const url = req.url;
   const userAgent = req.get("User-Agent");
   
   // Color-code different HTTP methods with background colors
   const coloredMethod = (() => {
       switch (method) {
           case 'GET':
               return chalk.black.bgGreen(` ${method} `);
           case 'POST':
               return chalk.black.bgYellow(` ${method} `);
           case 'PUT':
               return chalk.white.bgBlue(` ${method} `);
           case 'DELETE':
               return chalk.white.bgRed(` ${method} `);
           case 'PATCH':
               return chalk.black.bgMagenta(` ${method} `);
           default:
               return chalk.white.bgGray(` ${method} `);
       }
   })();

   console.log(
       `${coloredMethod} ${chalk.white.bgCyan(` ${url} `)} - ` +
       `${chalk.black.bgWhite(` ${userAgent} `)}`
   );
   next();
};

const addTimeStamp = (req, res, next) => {
   req.timeStamp = new Date().toISOString();
   console.log(
       `${chalk.white.bgBlue(' TIMESTAMP ')} ` +
       `${chalk.black.bgWhite(` Added: ${req.timeStamp} `)}`
   );
   next();
};

export { requestLogger, addTimeStamp };