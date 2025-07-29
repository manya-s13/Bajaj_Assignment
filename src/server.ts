import express, { Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";

const app = express();
const PORT = process.env.PORT || 3000;


app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "10mb" }));


interface RequestData {
  data: string[];
}

interface ResponseData {
  is_success: boolean;
  user_id: string;
  email: string;
  roll_number: string;
  odd_numbers: string[];
  even_numbers: string[];
  alphabets: string[];
  special_characters: string[];
  sum: string;
  concat_string: string;
}


const isNumber = (str: string): boolean => {
  return !isNaN(Number(str)) && !isNaN(parseFloat(str));
};


const isAlphabet = (str: string): boolean => {
  return /^[a-zA-Z]+$/.test(str);
};


const isSpecialCharacter = (str: string): boolean => {
  return !/^[a-zA-Z0-9]+$/.test(str);
};


const createConcatString = (alphabets: string[]): string => {
  
  const allChars = alphabets.join("").split("").reverse();

  
  let result = "";
  for (let i = 0; i < allChars.length; i++) {
    if (i % 2 === 1) {
      result += allChars[i].toLowerCase();
    } else {
      result += allChars[i].toUpperCase();
    }
  }

  return result;
};


app.post("/bfhl", (req: Request, res: Response) => {
  try {
    const { data }: RequestData = req.body;

   
    if (!data || !Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: "Invalid input: data must be an array",
      });
    }

    
    const oddNumbers: string[] = [];
    const evenNumbers: string[] = [];
    const alphabets: string[] = [];
    const specialCharacters: string[] = [];
    let sum = 0;

   
    data.forEach((item: string) => {
      if (isNumber(item)) {
        const num = parseInt(item);
        sum += num;

        if (num % 2 === 0) {
          evenNumbers.push(item);
        } else {
          oddNumbers.push(item);
        }
      } else if (isAlphabet(item)) {
        alphabets.push(item.toUpperCase());
      } else if (isSpecialCharacter(item)) {
        specialCharacters.push(item);
      }
    });

    
    const concatString = createConcatString(alphabets);

  
    const response: ResponseData = {
      is_success: true,
      user_id: "manya_sharma_13042004", 
      email: "manya1901.be22@chitkara.edu.in", 
      roll_number: "2210991901", 
      odd_numbers: oddNumbers,
      even_numbers: evenNumbers,
      alphabets: alphabets,
      special_characters: specialCharacters,
      sum: sum.toString(),
      concat_string: concatString,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing request:", error);
    res.status(500).json({
      is_success: false,
      error: "Internal server error",
    });
  }
});

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "BFHL API is running",
    endpoints: {
      post: "/bfhl",
      health: "/health",
    },
  });
});


app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error(err.stack);
  res.status(500).json({
    is_success: false,
    error: "Something went wrong!",
  });
});


app.use("*", (req: Request, res: Response) => {
  res.status(404).json({
    is_success: false,
    error: "Endpoint not found",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API endpoint: http://localhost:${PORT}/bfhl`);
});

export default app;
