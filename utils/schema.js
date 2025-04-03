
import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview = pgTable(
    "mock_interview",{
        id:serial("id").primaryKey(),
        jsonMockResp:text('jsonMockResp').notNull(),
        jobPosition:varchar('jobPosition').notNull(),
        jobDesc:varchar('jobDesc').notNull(),
        jobExperience:varchar('jobExperience').notNull(),
        jobCompany:varchar('jobCompany').notNull(),
        createdBy:varchar('createdBy').notNull(),
        createdAt:varchar('createdAt').notNull(),
        mockId:varchar('mockId').notNull(),
        

    }
)