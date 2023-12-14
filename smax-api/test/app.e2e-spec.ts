//make a database for testing !
//Everytime we run tests, clean up data
//We must call request like we do with Postman
import { INestApplication } from '@nestjs/common'
import {Test} from '@nestjs/testing'
import { AppModule } from 'src/app.module'
describe('App EndToEnd tests', () => {
  let app: INestApplication
  beforeAll( async () => {
    const appModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()
    app = appModule.createNestApplication();
  })
  it.todo('should PASS, keke 1')
  it.todo('should PASS, keke 2')
})