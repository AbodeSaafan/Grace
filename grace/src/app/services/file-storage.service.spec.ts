import { TestBed, inject } from '@angular/core/testing';

import { FileStorageService } from './file-storage.service';

describe('FileStorageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileStorageService]
    });
  });

  it('should ...', inject([FileStorageService], (service: FileStorageService) => {
    expect(service).toBeTruthy();
  }));
});
