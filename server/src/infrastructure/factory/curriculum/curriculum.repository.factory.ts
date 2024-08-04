import { CurriculumRepository } from "../../../domain/repositories";
import { CurriculumDataSourceImpl } from "../../datasources/curriculum/curriculum.datasource.impl";
import { CurriculumRepositoryImpl } from "../../repositories/curriculum/curriculum.repository.impl";
import { CloudinaryService } from "../../services/cloud/cloud-storage-service.impl";

export function createCurriculumRepository(): CurriculumRepository {
    const cloudStorage = new CloudinaryService();
    const dataSource = new CurriculumDataSourceImpl(cloudStorage);
    return new CurriculumRepositoryImpl(dataSource);
}