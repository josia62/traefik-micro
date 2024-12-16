declare module "object-mapper" {
  type Mapping = {
    [key: string]: string | { key: string; transformation?: (value: any) => any };
  };

  function objectMapper<T>(source: T, mapping: Mapping): T;

  export = objectMapper;
}
