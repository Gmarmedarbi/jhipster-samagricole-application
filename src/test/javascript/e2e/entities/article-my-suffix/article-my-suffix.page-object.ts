import { element, by, ElementFinder } from 'protractor';

export class ArticleComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-article-my-suffix div table .btn-danger'));
  title = element.all(by.css('jhi-article-my-suffix div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class ArticleUpdatePage {
  pageTitle = element(by.id('jhi-article-my-suffix-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  idInput = element(by.id('field_id'));
  codeInput = element(by.id('field_code'));
  libelleInput = element(by.id('field_libelle'));
  pUHTInput = element(by.id('field_pUHT'));
  tVAInput = element(by.id('field_tVA'));
  pUTTCInput = element(by.id('field_pUTTC'));

  categorieSelect = element(by.id('field_categorie'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setIdInput(id: string): Promise<void> {
    await this.idInput.sendKeys(id);
  }

  async getIdInput(): Promise<string> {
    return await this.idInput.getAttribute('value');
  }

  async setCodeInput(code: string): Promise<void> {
    await this.codeInput.sendKeys(code);
  }

  async getCodeInput(): Promise<string> {
    return await this.codeInput.getAttribute('value');
  }

  async setLibelleInput(libelle: string): Promise<void> {
    await this.libelleInput.sendKeys(libelle);
  }

  async getLibelleInput(): Promise<string> {
    return await this.libelleInput.getAttribute('value');
  }

  async setPUHTInput(pUHT: string): Promise<void> {
    await this.pUHTInput.sendKeys(pUHT);
  }

  async getPUHTInput(): Promise<string> {
    return await this.pUHTInput.getAttribute('value');
  }

  async setTVAInput(tVA: string): Promise<void> {
    await this.tVAInput.sendKeys(tVA);
  }

  async getTVAInput(): Promise<string> {
    return await this.tVAInput.getAttribute('value');
  }

  async setPUTTCInput(pUTTC: string): Promise<void> {
    await this.pUTTCInput.sendKeys(pUTTC);
  }

  async getPUTTCInput(): Promise<string> {
    return await this.pUTTCInput.getAttribute('value');
  }

  async categorieSelectLastOption(): Promise<void> {
    await this.categorieSelect.all(by.tagName('option')).last().click();
  }

  async categorieSelectOption(option: string): Promise<void> {
    await this.categorieSelect.sendKeys(option);
  }

  getCategorieSelect(): ElementFinder {
    return this.categorieSelect;
  }

  async getCategorieSelectedOption(): Promise<string> {
    return await this.categorieSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class ArticleDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-article-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-article'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
