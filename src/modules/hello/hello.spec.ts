import { Test, TestingModule } from '@nestjs/testing';
import { HelloResolver } from './hello.resolver';
import { HelloService } from './hello.service';

describe('HelloResolver', () => {
  let resolver: HelloResolver;
  let helloService: HelloService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HelloResolver,
        {
          provide: HelloService,
          useValue: {
            hello: jest.fn().mockReturnValue('Hello World!'),
          },
        },
      ],
    }).compile();

    resolver = module.get<HelloResolver>(HelloResolver);
    helloService = module.get<HelloService>(HelloService);
  });

  it('should return "Hello World!"', () => {
    expect(resolver.hello()).toBe('Hello World!');
    expect(helloService.hello).toHaveBeenCalled();
  });
});
